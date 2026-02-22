import java.util.Scanner;
class CharacterTypeChecker
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter ch value:");
		char ch=sc.next().charAt(0);
		if((ch>='a'&&ch<='z')||(ch>='A'&&ch<='Z'))
		{
			if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U')
				System.out.println("vowels");
			else
				System.out.println("consonants");
		}
		else if(ch>='0'&&ch<='9')
			System.out.println("digits");
		else
			System.out.println("symbols");
	}
}