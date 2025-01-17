terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  credentials = file(var.google_service_credentials_json_file)
  project     = local.google_project_id
  region      = var.google_region
  zone        = var.google_zone
}

resource "google_compute_network" "vpc_network" {
  name = "${local.environment_name}-network"
}

resource "google_compute_instance" "vm_instance" {
  name         = "${local.environment_name}-vm"
  machine_type = var.google_machine_type
  tags         = ["mithril", local.environment_name, var.environment_prefix, var.cardano_network]

  allow_stopping_for_update = true

  metadata = {
    sshKeys = file("./assets/ssh_keys")
  }

  metadata_startup_script = file("./assets/startup-vm.sh")

  boot_disk {
    source = google_compute_disk.boot.name
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
      nat_ip = google_compute_address.mithril-external-address.address
    }
  }
}

resource "google_compute_disk" "boot" {
  name     = "${local.environment_name}-boot"
  type     = var.google_compute_instance_boot_disk_type
  zone     = var.google_zone
  size     = var.google_compute_instance_boot_disk_size
  image    = var.google_compute_instance_boot_disk_image
  snapshot = var.google_compute_instance_boot_disk_snapshot
  labels = {
    environment = local.environment_name
  }
}

resource "google_compute_address" "mithril-external-address" {
  name = "${local.environment_name}-ip"
}

resource "google_compute_resource_policy" "policy" {
  name   = "${local.environment_name}-policy"
  region = var.google_region
  snapshot_schedule_policy {
    schedule {
      daily_schedule {
        days_in_cycle = 1
        start_time    = "04:00"
      }
    }
    retention_policy {
      max_retention_days    = var.google_snapshot_max_retention_days
      on_source_disk_delete = "KEEP_AUTO_SNAPSHOTS"
    }
  }
}

resource "google_compute_disk_resource_policy_attachment" "attachment" {
  name = google_compute_resource_policy.policy.name
  disk = google_compute_disk.boot.name
  zone = var.google_zone
}
