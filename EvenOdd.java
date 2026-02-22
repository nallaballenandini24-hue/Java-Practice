import java.util.Scanner;
class EvenOdd
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter n value:");
		int n=sc.nextInt();
		if((n&1)==0)
			System.out.println("even");
		else
			System.out.println("odd");
	}
}
		
		