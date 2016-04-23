package util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class Util {
    public String criptografa(String textoSimples) throws NoSuchAlgorithmException, UnsupportedEncodingException {
    //definimos o algoritmo de criptografia - (SHA-256)
    MessageDigest criptografia = MessageDigest.getInstance("SHA-256");
    //convertemos o texto criptografado com a página de código UTF-8
    byte textoCriptografado[] = criptografia.digest(textoSimples.getBytes("UTF-8"));
    return Arrays.toString(textoCriptografado);
    } 
}
