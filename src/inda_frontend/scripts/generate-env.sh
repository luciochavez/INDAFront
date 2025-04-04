#!/bin/bash

# Archivo .env de DFX (ajusta la ruta según tu caso)
DFX_ENV_PATH="../../.env"  

# Archivo donde guardaremos las variables con el prefijo VITE_
VITE_ENV_PATH="./.env"

# Limpiamos el archivo anterior
echo "" > $VITE_ENV_PATH


while IFS='=' read -r key value
do
    # Filtrar solo las variables de DFX y agregar el prefijo VITE_
    if [[ $key == CANISTER_ID* || $key == DFX_* ]]; then
        echo "VITE_${key}=${value}" >> $VITE_ENV_PATH
    fi
done < $DFX_ENV_PATH

