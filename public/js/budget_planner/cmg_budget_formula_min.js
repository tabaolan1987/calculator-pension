/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 X=1;5 10=2;5 U=3;5 18=4;5 17=4.1f;5 V=2.1p;5 1k=1;5 14=0.1j;i 1i(a){7(a==""||1h a=="1l"){9 0}n{9 P(a)}}i C(c){c=P(c);5 a=0;7(16(c)==c){a=N.19(c)}n{5 b=1m(c);a=N.19(c,b,",",".")}9 a}i P(b){5 a=N.1g(b);9 a}i v(a){5 c=Q(a);c=1b.v(c);5 b=15 1o(c).1n(0);9 b}i 1q(d,c){5 b=0;7(c==X){5 a=(d*17);b=v(a)}n{7(c==10){5 a=(d*V);b=v(a)}n{7(c==U){b=1b.v(d)}n{7(c==18){7(d==6){b=1}n{5 a=d*14;b=v(a)}}}}}9 b}5 m=15 1e();i B(){5 a=m.M;9 a}i O(){5 a=0;o(5 b=2;b<=r();b++){a=a+m["8"+b]}9 a}i z(b,c){5 a=(c/b)*A;a=v(a);9 a}i r(){5 a=$(".1v-1y").1z();9 a}i 1A(){5 a=T;o(5 b=1;b<=r();b++){7(m["8"+b]==1B){1c=S;9 1c}}9 a}i 1r(){5 b=B();5 a=O();7(a>b){$("#1w").Y("Z")}}i 1s(){5 c=[];5 b=B();5 g=O();7(b>g){5 f=b-g;5 l=1a[1]+"||"+12.M+":£"+f;c[0]={w:l,t:z(b,f),s:x.M};5 j=1;o(5 d=2;d<=r();d++){7(m["8"+d]>0){5 l=u(d);c[j]={w:l,t:z(b,m["8"+d]),s:x["8"+d]};j++}}F(c);7(f>A){1x(i(){$("#1t").Y("Z")},1u)}$(".E").G(\'<q y="H">L J <D/>I K</q> <p>£\'+C(f)+"</p>")}n{7(b==g){5 j=0;o(5 d=2;d<=r();d++){7(m["8"+d]>0){5 l=u(d);c[j]={w:l,t:z(b,m["8"+d]),s:x["8"+d]};j++}}F(c);$(".E").G(\'<q y="H">L J <D/>I K</q> <p>£0</p>\')}n{7(b<g){7(11()){o(5 d=2;d<=r();d++){5 k=m["8"+d];7(k>=b){5 l=u(d);c[0]={w:l,t:A,s:x["8"+d]};R}}F(c);5 a=g-b;$(".E").G(\'<q y="H">L J <D/>I K</q> <p y="1d">£ -\'+C(a)+"</p>")}n{c=13();5 e=[];5 h=c.W-1;o(5 d=0;d<c.W;d++){e[h]=c[d];h--}F(e);5 a=g-b;$(".E").G(\'<q y="H">L J <D/>I K</q> <p y="1d">£ -\'+C(a)+"</p>")}}}}}i 13(){5 d=B();5 g=0;5 h=0;o(5 f=2;f<=r();f++){h=f;5 a=z(d,m["8"+f]);g=g+16(a);7(g>=A){R}}5 e=[];5 b=0;5 k=A;o(5 c=h;c>1;c--){5 a=Q(z(d,m["8"+c]));7(k>a){5 l=u(c);e[b]={w:l,t:a,s:x["8"+c]};k=k-a;b++}n{7(k==a){5 l=u(c);e[b]={w:l,t:a,s:x["8"+c]};9 e}n{7(k<a){5 l=u(c);e[b]={w:l,t:k,s:x["8"+c]};9 e}}}}}i u(a){5 b=1a[a]+"||"+12["8"+a]+":£"+m["8"+a];9 b}i 11(){5 a=m.M;o(5 b=2;b<=r();b++){5 c=m["8"+b];7(c>=a){9 S}}9 T};',62,100,'|||||var||if|tab|return|||||||||function||||totalsArray|else|for||span|getSizeArray|color|data|combineToToolTip|round|label|tabColor|class|getPersent|100|getTotalIncome|addCommas|br|labelChart|drawChart|html|total|disposable|monthly|income|Total|tab1|accounting|getTotalOutcome|removeCommas|parseFloat|break|true|false|Monthly_Type|Fortnightly_multiplicand|length|Weekly_Type|modal|show|Fortnightly_Type|checkOutcomeExceedTotalIncome|tabName|getDataSpecialCase|Yearly_multiplicand|new|parseInt|Weekly_multiplicand|Yearly_Type|formatNumber|ImageArray|Math|showPopUp|exceed|Array|333333333|unformat|typeof|parseFloatCMG|08333333333|Monthly_multiplicand|underfined|decimalPlaces|toFixed|Number|166666667|calculateInputBaseOnType|checkTotalOutcome|drawFlotJs|myModal3|2000|row|myModal2|setTimeout|heading|size|checkZero|null'.split('|'),0,{}))