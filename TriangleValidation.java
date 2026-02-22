import java.util.Scanner;
class TriangleValidation
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
		if((a+b>c)&& (b+c>a)&&(c+a>b))
			System.out.println("triangle");
		else
			System.out.println("not a triangle");
	}
}