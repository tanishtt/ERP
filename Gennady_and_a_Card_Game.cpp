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
    ll c=0,i;
    string s,s1;
    cin>>s;
    for(i=0; i<5; i++)
    {
        cin>>s1;
        if((s[0]==s1[0])||(s[1]==s1[1]))
            c++;
    }
    if(c>0)
        cout<<"YES"<<endl;
    else
        cout<<"NO"<<endl;
    
}

int main() {
	init_code();
	ll t;
		solve();
}