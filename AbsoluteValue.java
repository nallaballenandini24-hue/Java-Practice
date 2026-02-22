import java.util.Scanner;
class AbsoluteValue
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter n value:");
		int n=sc.nextInt();
		if(n<0)
			n=-n;
		    System.out.println(n);
	}
}
		