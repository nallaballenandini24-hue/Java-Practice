import java.util.Scanner;
class PairSum
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
		System.out.println("array elements are");
		for(int i=0;i<n;i++)
		{
			System.out.println(arr[i]);
		}
		System.out.println("enter target element:");
		int target=sc.nextInt();
		int left=0;
		int right=arr.length-1;
		while(left<right)
		{
			int sum=arr[left]+arr[right];
			if(sum==target)
			{
				System.out.println(arr[left]+"+"+ arr[right]+"="+target);
				break;
		
			}
			else if(sum>target)
			{
				right--;
			}
			else if(sum<target)
			{
				left++;
			}
		}
	}
}
		
		
