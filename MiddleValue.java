import java.util.Scanner;
class MiddleValue
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
		if((a>b&&a<c)||(a<b&&a>c))
			System.out.println("middle value:"+a);
		else if((b>a&&b<c)||(b<a&&b>c))
			System.out.println("middle value:"+b);
		else
			System.out.println("middle value:"+c);
	}
}