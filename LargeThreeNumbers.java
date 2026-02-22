import java.util.Scanner;
class LargeThreeNumbers
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter a value:");
		int a=sc.nextInt();
		System.out.println("enter b value:");
		int b=sc.nextInt();
		System.out.println("enter c value:");
		int c=sc.nextInt();
		if(a>b && a>c)
			System.out.println("large number is:"+a);
		else if(b>c && b>a)
			System.out.println("large number is:"+b);
		else
			System.out.println("large number is:"+c);
	}
}