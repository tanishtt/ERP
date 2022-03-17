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
    

    ll n,m,k;
    
        cin>>n>>m>>k;
        if(n<=m && n<=k){
            cout<<"YES"<<endl;
        }
        else{
            cout<<"NO"<<endl;
        }
    
}

int main() {
	init_code();
	ll t;
		solve();
}