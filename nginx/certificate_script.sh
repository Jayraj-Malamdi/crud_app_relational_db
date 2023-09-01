#!/bin/bash
# Generate a key and public CA certificate
echo "Enter the Domain name: ";
read DOMAIN;
echo "Enter IP on which the website is hosted locally: ";
read IP;
openssl req -x509 \
            -sha256 -days 356 \
            -nodes \
            -newkey rsa:2048 \
            -keyout rootCA.key -out rootCA.crt;
#Create a RSA key
openssl genrsa -out $DOMAIN.key 2048;

#Create a certificate signing request


echo "Enter Country name: ";
read country;
echo "Enter State or Province name: ";
read state;
echo "Enter locality: ";
read locality;
echo "Enter Organization name:";
read organization;
echo "Enter organization unit name:";
read ou;
cat > csr.conf <<EOF
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = $country
ST = $state
L = $locality
O = $organization
OU = $ou
CN = $DOMAIN

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = $DOMAIN

IP.1 = $IP


EOF
# create CSR request using private key

openssl req -new -key ${DOMAIN}.key -out ${DOMAIN}.csr -config csr.conf

# Create a external config file for the certificate

cat > cert.conf <<EOF

authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${DOMAIN}

EOF

# Create SSl with self signed CA

openssl x509 -req \
    -in ${DOMAIN}.csr \
    -CA rootCA.crt -CAkey rootCA.key \
    -CAcreateserial -out ${DOMAIN}.crt \
    -days 365 \
    -sha256 -extfile cert.conf

#move the key and certificate file to /etc/ssl
sudo cp *.crt *.key *.conf *.csr /etc/ssl;
