# Default values
if [ -z "${ROOT}" ]; then 
  ROOT="artifacts"
fi
if [ -z "${LINES}" ]; then 
  LINES="10"
fi
if [ -z "${NODES}" ]; then 
  NODES="*"
fi

# Change directory
cd ${ROOT}

# Logs devnet
echo "====================================================================="
echo " Logs Mithril/Cardano devnet"
echo "====================================================================="
echo
if [ "${NODES}" = "mithril" ] || [ "${NODES}" = "*" ]; then 
    echo "====================================================================="
    echo "=== Mithril Network"
    echo "====================================================================="
    echo
    LINES=${LINES} ./log-mithril.sh
    echo
fi
if [ "${NODES}" = "cardano" ] || [ "${NODES}" = "*" ]; then 
    echo "====================================================================="
    echo "=== Cardano Network"
    echo "====================================================================="
    echo
    LINES=${LINES} ./log-cardano.sh
    echo
fi