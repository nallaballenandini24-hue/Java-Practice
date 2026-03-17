import java.util.Scanner;
class ArrayBasics
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter n value:");
		int n=sc.nextInt();
		int arr[]=new int[n];
		System.out.println("enter array elements:");
		for(int i=0;i<n;i++)
		{
			arr[i]=sc.nextInt();
		}
		System.out.println("array elements are:");
		for(int i=0;i<n;i++)
		{
			System.out.println(arr[i]);
		}
		
		System.out.println("Array sum is:");
		int sum=0;
		for(int i=0;i<n;i++)
		{
			sum+=arr[i];
		}
		System.out.println(sum);
		
		System.out.println("maximum element:");
		int max=arr[0];
		for(int i=1;i<n;i++)
		{
			if(arr[i]>max)
			{
				max=arr[i];
			}
		}
	    System.out.println(max);
		
		System.out.println("minimum element:");
		int min=arr[0];
		for(int i=1;i<n;i++)
		{
			if(arr[i]<min)
			{
				min=arr[i];
			}
		}
		System.out.println(min);
		
		System.out.println("count even elements:");
		int count=0;
		for(int i=0;i<n;i++)
		{
			if(arr[i]%2==0)
				count++;
		}
		System.out.println(count);
		
		System.out.println("count odd elements:");
		int oddCount=0;
		for(int i=0;i<n;i++)
		{
			if(arr[i]%2!=0)
				oddCount++;
		}
		System.out.println(oddCount);
		
		System.out.println("reverse elements:");
		for(int i=arr.length-1;i>=0;i--)
		{
			System.out.println(arr[i]);
		}
	}
}
        