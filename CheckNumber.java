import java.util.Scanner;
class CheckNumber
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter n value:");
		int n=sc.nextInt();
		if(n==0)
		{
			System.out.println("zero");
		}
		else if(n>0)
		{
			if(n%2==0)
				System.out.println("positive even");
			else
				System.out.println("postive odd");
		}
		else
		{
			if(n%2==0)
				System.out.println("negative even");
			else
				System.out.println("negative odd");
		}
	}
}

			
			
			