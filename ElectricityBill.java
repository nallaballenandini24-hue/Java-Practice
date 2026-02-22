import java.util.Scanner;
class ElectricityBill
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter n value:");
		int n=sc.nextInt();
		int bill;
		if(n>=0 && n<=100)
			bill=n*2;
		else if(n>=101 && n<=200)
			bill=n*3;
		else
			bill=n*5;
		System.out.println("total bill:"+bill);
	}
}