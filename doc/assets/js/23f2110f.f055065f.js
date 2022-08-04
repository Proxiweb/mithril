"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[4189],{77146:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"2","metadata":{"permalink":"/doc/adr/2","source":"@site/adr/002-use-structured-logging.md","title":"2. Use simple structured logging\\n","description":"Status","date":"2022-08-04T13:55:41.000Z","formattedDate":"August 4, 2022","tags":[{"label":"Draft","permalink":"/doc/adr/tags/draft"}],"readingTime":0.665,"hasTruncateMarker":false,"authors":[],"frontMatter":{"slug":"2","title":"2. Use simple structured logging\\n","authors":[],"tags":["Draft"]},"nextItem":{"title":"1. Record Architecture Decisions\\n","permalink":"/doc/adr/1"}},"content":"## Status\\n\\n**Draft**\\n\\n## Context\\n\\n* Logs are a critical tool for operating any software system, enabling [observability](https://cloud.google.com/architecture/devops/devops-measurement-monitoring-and-observability) of the system.\\n* Following [12 Factor Apps](https://12factor.net/logs) principles, providing the needed components and tools to be able to configure logging and monitoring should not be the responsibility of the software components\\n\\n## Decision\\n\\n_Therefore_\\n\\n* Each component of the system use [Structured logging](https://www.sumologic.com/glossary/structured-logging/) using documented and standardised JSON format for its logs\\n* Logs are always emitted to `stdout` of the process the component is part of\\n\\n## Consequences\\n\\n* The schema of the logged items should be properly documented in a JSON schema\\n* It is the responsibility of the node operator to consume the logs and process them\\n* We use existing libraries to provide needed log infrastructure, like [slog](https://zsiciarz.github.io/24daysofrust/book/vol2/day4.html) for Rust"},{"id":"1","metadata":{"permalink":"/doc/adr/1","source":"@site/adr/001-use-adr.md","title":"1. Record Architecture Decisions\\n","description":"Status","date":"2022-08-04T13:55:41.000Z","formattedDate":"August 4, 2022","tags":[{"label":"Accepted","permalink":"/doc/adr/tags/accepted"}],"readingTime":0.515,"hasTruncateMarker":false,"authors":[],"frontMatter":{"slug":"1","title":"1. Record Architecture Decisions\\n","authors":[],"tags":["Accepted"]},"prevItem":{"title":"2. Use simple structured logging\\n","permalink":"/doc/adr/2"}},"content":"## Status\\n\\nAccepted\\n\\n## Context\\n\\nWe are in search for a means to describe our technical architecture.\\n\\nWe are a small team working in a very lean and agile way (XP), so we naturally\\nprefer also light-weight documentation methods which also accomodate change\\neasily.\\n\\n## Decision\\n\\n* We will use _Architecture Decision Records_, as described by Michael Nygard in\\n  this\\n  [article](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).\\n* We will follow the convention of storing those ADRs as Markdown formatted\\n  documents stored under `docs/adr` directory, as exemplified in Nat Pryce\'s\\n  [adr-tools](https://github.com/npryce/adr-tools). This does not imply we will\\n  be using `adr-tools` itself.\\n\\n## Consequences\\n\\nSee Michael Nygard\'s article, linked above."}]}')}}]);