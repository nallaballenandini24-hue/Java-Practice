import java.util.Scanner;
class LinearSearch
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter size of array:");
		int n=sc.nextInt();
		int[] arr=new int[n];
		System.out.println("enter array elements:");
		for(int i=0;i<arr.length;i++)
		{
			arr[i]=sc.nextInt();
		}
		System.out.println("array elements are:");
		for(int i=0;i<arr.length;i++)
		{
			System.out.println(arr[i]);
		}
		System.out.println("enter key value:");
		int key=sc.nextInt();
		boolean found=false;
		for(int i=0;i<arr.length;i++)
		{
			if(arr[i]==key)
			{
				
				System.out.println("element found at index"+ i);
				found=true;
				break;
			}
		}
		    if(found==false)
			{
			    System.out.println("element not found");
			}
	}
}