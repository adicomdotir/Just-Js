import java.util.*;
import java.lang.*;
import java.io.*;

public class TestClass {
	public static void main (String[] args) throws java.lang.Exception {
		Scanner sc = new Scanner(System.in);
		boolean flag = false;
		int n = sc.nextInt();
		sc.nextLine();
		for (int i = 0; i < n; i++) {
		    flag = false;
		    String[] splited = sc.nextLine().split(" ");
		    String king = splited[0];
		    String queen = splited[1];
		    char[] chKing = king.toCharArray();
		    char[] chQueen = queen.toCharArray();
		    if (chKing[0] == chQueen[0] && chKing[1] == chQueen[1]) {
		        System.out.print("Y ");
		    } else {
		        if (chKing[0] > chQueen[0] && chKing[1] == chQueen[1]) {
		            for (char j = chQueen[0]; j <= chKing[0]; j++) {
		                if (chKing[0] == j && chKing[1] == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[0] < chQueen[0] && chKing[1] == chQueen[1]) {
		            for (char j = chKing[0]; j <= chQueen[0]; j++) {
		                if (chQueen[0] == j && chKing[1] == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[1] > chQueen[1] && chKing[0] == chQueen[0]) {
		            for (int j = chQueen[1]; j <= chKing[1]; j++) {
		                if (chKing[0] == chQueen[0] && chKing[1] == j) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[1] < chQueen[1] && chKing[0] == chQueen[0]) {
		            for (int j = chKing[1]; j <= chQueen[1]; j++) {
		                if (chKing[0] == chQueen[0] && j == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[0] < chQueen[0] && chKing[1] < chQueen[1]) {
		            for (char k1 = chKing[0], k2 = chKing[1]; k1 <= chQueen[0] && k2 <= chQueen[1]; k1++, k2++) {
		                if (k1 == chQueen[0] && k2 == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[0] < chQueen[0] && chKing[1] > chQueen[1]) {
		            for (char k1 = chKing[0], k2 = chKing[1]; k1 <= chQueen[0] && k2 >= chQueen[1]; k1++, k2--) {
		                if (k1 == chQueen[0] && k2 == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[0] > chQueen[0] && chKing[1] < chQueen[1]) {
		        	for (char k1 = chKing[0], k2 = chKing[1]; k1 >= chQueen[0] && k2 <= chQueen[1]; k1--, k2++) {
		                if (k1 == chQueen[0] && k2 == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        } else if (chKing[0] > chQueen[0] && chKing[1] > chQueen[1]) {
		            for (char k1 = chQueen[0], k2 = chQueen[1]; k1 >= chKing[0] && k2 >= chKing[1]; k1--, k2--) {
		                if (k1 == chQueen[0] && k2 == chQueen[1]) {
            		        System.out.print("Y ");
            		        flag = true;
            		    }
		            }
		        }
		        if (!flag) {
		            System.out.print("N ");
		        }
		    }
		}
	}
}