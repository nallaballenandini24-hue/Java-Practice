import java.util.Scanner;
class DivisibleBy7
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("Enter n value:");
		int n=sc.nextInt();
		if(n%7==0)
			System.out.println("Divisible");
		else
			System.out.println("Not Divisible");
	}
}