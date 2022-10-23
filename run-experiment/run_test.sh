#!/bin/bash

set -e

echo "Teste de contrato inteligente. Nenhum parametro esperado. Parametros $#"

#LOCAL_FILE=""
REMOTE_SERVER="http://localhost:30337"


#if [ $# != 2 ]
#then
#  echo "expects three parameters (server, file): ./remote_compile_cs.sh http://localhost:10000 exemplo.cs"
#  echo "results are: output.err output.avm output.abi"
#  exit 1;
#else
#  REMOTE_SERVER=$1
#  LOCAL_FILE=$2
#fi  

echo "Using: server=$REMOTE_SERVER"

jq --version # echo "we need command 'jq' to parse json structure"

WELCOME=`curl -s "$REMOTE_SERVER" | jq '.welcome'`
echo "$WELCOME"

contrato="0xd277dd16fba842ab5c6ead82a6ec0c33a2fdf6bb"
#
store_key="bigdiff"
store_bigdiff=`echo -n "$store_key" | xxd -p | xxd -r -p | base64`
#echo "store_bigdiff=$store_bigdiff"
storage=$store_bigdiff
echo ""
echo "Acessando STORAGE '$store_key' do CONTRATO '$contrato'"
echo "STORAGE_KEY=$storage"

STORE=`curl -X POST -H "Content-Type: application/json" -d \
    '{"jsonrpc":"2.0","id":5,"method":"getstorage","params":["'$contrato'","'$storage'"]}' "$REMOTE_SERVER" | jq '.result'`
# remove double quotes
echo "STORE=$STORE"
STORE2=`echo "${STORE:1:${#STORE}-2}"`
echo "STORE2=$STORE2"
OUT_HEX=`echo $STORE2 | base64 --decode | xxd -p`
# echo "OUT_HEX=$OUT_HEX"
# from hex to non-negative bigint
plusZero=`echo -n "${OUT_HEX}00"`
bigEndianValue=`echo $plusZero|fold -w2|tac|tr -d "\n"`
intValue=`perl -le 'print hex("'$bigEndianValue'");'`
echo "intValue=$intValue"
echo ""


store_key="val0"
store_bigdiff=`echo -n "$store_key" | xxd -p | xxd -r -p | base64`
#echo "store_bigdiff=$store_bigdiff"
storage=$store_bigdiff
echo ""
echo "Acessando STORAGE '$store_key' do CONTRATO '$contrato'"

STORE=`curl -X POST -H "Content-Type: application/json" -d \
    '{"jsonrpc":"2.0","id":5,"method":"getstorage","params":["'$contrato'","'$storage'"]}' "$REMOTE_SERVER" | jq '.result'`
# remove double quotes
echo "STORE=$STORE"
STORE2=`echo "${STORE:1:${#STORE}-2}"`
echo "STORE2=$STORE2"
OUT_HEX=`echo $STORE2 | base64 --decode | xxd -p`
# echo "OUT_HEX=$OUT_HEX"
# from hex to non-negative bigint
plusZero=`echo -n "${OUT_HEX}00"`
bigEndianValue=`echo $plusZero|fold -w2|tac|tr -d "\n"`
intValue=`perl -le 'print hex("'$bigEndianValue'");'`
echo "intValue=$intValue"
echo ""


store_key="val1"
store_bigdiff=`echo -n "$store_key" | xxd -p | xxd -r -p | base64`
#echo "store_bigdiff=$store_bigdiff"
storage=$store_bigdiff
echo ""
echo "Acessando STORAGE '$store_key' do CONTRATO '$contrato'"

STORE=`curl -X POST -H "Content-Type: application/json" -d \
    '{"jsonrpc":"2.0","id":5,"method":"getstorage","params":["'$contrato'","'$storage'"]}' "$REMOTE_SERVER" | jq '.result'`
# remove double quotes
echo "STORE=$STORE"
STORE2=`echo "${STORE:1:${#STORE}-2}"`
echo "STORE2=$STORE2"
OUT_HEX=`echo $STORE2 | base64 --decode | xxd -p`
# echo "OUT_HEX=$OUT_HEX"
# from hex to non-negative bigint
plusZero=`echo -n "${OUT_HEX}00"`
bigEndianValue=`echo $plusZero|fold -w2|tac|tr -d "\n"`
intValue=`perl -le 'print hex("'$bigEndianValue'");'`
echo "intValue=$intValue"
echo ""

store_key="val2"
store_bigdiff=`echo -n "$store_key" | xxd -p | xxd -r -p | base64`
#echo "store_bigdiff=$store_bigdiff"
storage=$store_bigdiff
echo ""
echo "Acessando STORAGE '$store_key' do CONTRATO '$contrato'"

STORE=`curl -X POST -H "Content-Type: application/json" -d \
    '{"jsonrpc":"2.0","id":5,"method":"getstorage","params":["'$contrato'","'$storage'"]}' "$REMOTE_SERVER" | jq '.result'`
# remove double quotes
echo "STORE=$STORE"
STORE2=`echo "${STORE:1:${#STORE}-2}"`
echo "STORE2=$STORE2"
OUT_HEX=`echo $STORE2 | base64 --decode | xxd -p`
# echo "OUT_HEX=$OUT_HEX"
# from hex to non-negative bigint
plusZero=`echo -n "${OUT_HEX}00"`
bigEndianValue=`echo $plusZero|fold -w2|tac|tr -d "\n"`
intValue=`perl -le 'print hex("'$bigEndianValue'");'`
echo "intValue=$intValue"
echo ""



echo "FINISHED!"
