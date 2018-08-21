#!/usr/bin/env bash

POSITIONAL=()

while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -a|--action)
            ACTION="$2"
            shift
            shift
            ;;
        --dev)
            ENV="local"
            shift
            ;;
        --prod)
            ENV="production"
            shift
            ;;
        --up)
            ACTION="up"
            shift
            ;;
        --down)
            ACTION="down"
            shift
            ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 "$1"
fi

# prepare paths
CURDIR=$(pwd)
DIRPATH="${CURDIR}"/docker-compose/"${ENV}"
FILEPATH="${DIRPATH}"/docker-compose.yml

echo ENVIRONMENT = "${ENV}"
echo FILEPATH = "${FILEPATH}"

# docker logic
if [ $(ls -1f "${FILEPATH}" | wc -l) -eq 1 ]
then
    if [ "${ACTION}" = "up" ]
    then
        (cd "${DIRPATH}" && docker-compose up -d)
    fi

    if [ "${ACTION}" = "down" ]
    then
        (cd "${DIRPATH}" && docker-compose down)
    fi
fi