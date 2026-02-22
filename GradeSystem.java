import java.util.Scanner;
class GradeSystem
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("Enter marks:");
		int marks=sc.nextInt();
		if(marks>=90)
			System.out.println("grade A");
		else if(marks>=75 && marks <=89)
			System.out.println("grade B");
		else if(marks>=50  && marks<=74)
			System.out.println("grade C");
		else
			System.out.println("fail");
	}
}