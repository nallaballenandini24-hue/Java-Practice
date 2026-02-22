import java.util.Scanner;
class ArthematicUsingSwitch
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter a value:");
		int a=sc.nextInt();
		System.out.println("enter operator('+','-','*','/','%'):");
		char op=sc.next().charAt(0);
		System.out.println("enter b value:");
		int b=sc.nextInt();
		switch(op)
		{
			case '+':
			    System.out.println("result:"+(a+b));
				break;
			case '-':
			    System.out.println("result:"+(a-b));
				break;
			case '*':
			    System.out.println("result:"+(a*b));
				break;
			case '/':
			    System.out.println("result:"+(a/b));
				break;
			case '%':
			    System.out.println("result:"+(a%b));
				break;
			default:
			    System.out.println("invalid operator");
		}
	}
}
			    
			
		