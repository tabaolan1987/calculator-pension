/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 19=1;5 16=2;5 W=3;5 U=4;5 1a=4.1d;5 14=2.1h;5 1o=1;5 S=0.1m;m v(a){5 c=Z(a);c=15.v(c);5 b=T C(c).1l(0);9 b}m 1j(d,c){5 b=0;7(c==19){5 a=(d*1a);b=v(a)}n{7(c==16){5 a=(d*14);b=v(a)}n{7(c==W){b=15.v(d)}n{7(c==U){7(d==6){b=1}n{5 a=d*S;b=v(a)}}}}}9 b}5 i=T 1i();m D(){5 a=i.J;9 a}m O(){5 a=0;o(5 b=2;b<=r();b++){a=a+i["8"+b]}9 a}m z(b,c){5 a=(c/b)*y;a=v(a);9 a}m r(){5 a=$(".1n-1f").1c();9 a}m 1e(){5 a=1b;o(5 b=1;b<=r();b++){7(i["8"+b]==1g){10=12;9 10}}9 a}m 1k(){5 b=D();5 a=O();7(a>b){$("#1q").1v("1w")}}m 1p(){5 c=[];5 b=D();5 g=O();7(b>g){5 f=b-g;5 l=X[1]+"||"+Y.J+":£"+f;c[0]={x:l,q:z(b,f),w:t.J};5 j=1;o(5 d=2;d<=r();d++){7(i["8"+d]>0){5 l=u(d);c[j]={x:l,q:z(b,i["8"+d]),w:t["8"+d]};j++}}I(c);$(".H").K(\'<s A="L">N F M G</s> <p>£\'+C(f).P("Q").R(".")[0]+"</p>")}n{7(b==g){5 j=0;o(5 d=2;d<=r();d++){7(i["8"+d]>0){5 l=u(d);c[j]={x:l,q:z(b,i["8"+d]),w:t["8"+d]};j++}}I(c);$(".H").K(\'<s A="L">N F M G</s> <p>£0</p>\')}n{7(b<g){7(13()){o(5 d=2;d<=r();d++){5 k=i["8"+d];7(k>=b){5 l=u(d);c[0]={x:l,q:y,w:t["8"+d]};17}}I(c);5 a=g-b;$(".H").K(\'<s A="L">N F M G</s> <p A="V">£ -\'+C(a).P("Q").R(".")[0]+"</p>")}n{c=18();5 e=[];5 h=c.11-1;o(5 d=0;d<c.11;d++){e[h]=c[d];h--}E.B(e);I(e);5 a=g-b;$(".H").K(\'<s A="L">N F M G</s> <p A="V">£ -\'+C(a).P("Q").R(".")[0]+"</p>")}}}}}m 18(){5 d=D();5 g=0;5 h=0;o(5 f=2;f<=r();f++){h=f;5 a=z(d,i["8"+f]);g=g+1s(a);7(g>=y){17}}5 e=[];5 b=0;5 k=y;o(5 c=h;c>1;c--){5 a=Z(z(d,i["8"+c]));E.B("1x 1u : "+a);7(k>a){5 l=u(c);e[b]={x:l,q:a,w:t["8"+c]};k=k-a;b++}n{7(k==a){5 l=u(c);e[b]={x:l,q:a,w:t["8"+c]};E.B("9 q y");9 e}n{7(k<a){5 l=u(c);e[b]={x:l,q:k,w:t["8"+c]};E.B("9 q 1r 1t y");9 e}}}}}m u(a){5 b=X[a]+"||"+Y["8"+a]+":£"+i["8"+a];9 b}m 13(){5 a=i.J;o(5 b=2;b<=r();b++){5 c=i["8"+b];7(c>=a){9 12}}9 1b};',62,96,'|||||var||if|tab|return|||||||||totalsArray||||function|else|for||data|getSizeArray|span|tabColor|combineToToolTip|round|color|label|100|getPersent|class|log|Number|getTotalIncome|console|monthly|income|labelChart|drawChart|tab1|html|total|disposable|Total|getTotalOutcome|toLocaleString|en|split|Yearly_multiplicand|new|Yearly_Type|exceed|Monthly_Type|ImageArray|tabName|parseFloat|showPopUp|length|true|checkOutcomeExceedTotalIncome|Fortnightly_multiplicand|Math|Fortnightly_Type|break|getDataSpecialCase|Weekly_Type|Weekly_multiplicand|false|size|333333333|checkZero|heading|null|166666667|Array|calculateInputBaseOnType|checkTotalOutcome|toFixed|08333333333|row|Monthly_multiplicand|drawFlotJs|myModal2|bigger|parseInt|than|again|modal|show|per'.split('|'),0,{}))
