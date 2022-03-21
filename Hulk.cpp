#include <bits/stdc++.h>

using namespace std;
typedef vector <int> vi;
typedef pair<int, int> pi;
typedef long long ll;
typedef long double ld;
#define FOR(i,a,b) for (int i=a;i<b;i++)
#define nl "\n"
#define pb push_back
#define fio ios_base::sync_with_stdio(false);cout.tie(NULL);cin.tie(NULL);

void init_code() {
	fio;
#ifndef ONLINE_JUDGE
	freopen("input.txt", "r", stdin);
	freopen("output.txt", "w", stdout);
#endif
}

void solve() {
    ll n,i;
    cin>>n;
    for ( i=1; i<=n; i++)
    {
        if(i%2==1)
            cout<<"I hate  ";
        else
        {
            cout<<"I love  ";
        }
        if(i!=n)
        {
            cout<<"that ";
        }
 
    }
    cout<<"it";
}

int main() {
	init_code();
	ll t;
		solve();
}