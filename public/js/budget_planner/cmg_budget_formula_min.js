/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 13=1;5 17=2;5 11=3;5 U=4;5 16=4.1c;5 12=2.1d;5 1k=1;5 Z=0.1j;m u(a){5 c=X(a);c=T.u(c);5 b=10 K(c).1f(0);i b}m 1g(d,c){5 b=0;7(c==13){5 a=(d*16);b=u(a)}n{7(c==17){5 a=(d*12);b=u(a)}n{7(c==11){b=T.u(d)}n{7(c==U){7(d==6){b=1}n{5 a=d*Z;b=u(a)}}}}}i b}5 9=10 1i();m A(){5 a=9.L;i a}m O(){5 a=0;o(5 b=2;b<=r();b++){a=a+9["8"+b]}i a}m y(b,c){5 a=(c/b)*B;a=u(a);i a}m r(){5 a=$(".1b-1a").1e();i a}m 1h(){5 a=19;o(5 b=1;b<=r();b++){7(9["8"+b]==1n){W=V;i W}}i a}m 1q(){5 b=A();5 a=O();7(a>b){$("#1r").1o("1p")}}m 1l(){5 c=[];5 b=A();5 g=O();7(b>g){5 f=b-g;5 l=Q[1]+"||"+S.L+":£"+f;c[0]={x:l,w:y(b,f),s:v.L};5 j=1;o(5 d=2;d<=r();d++){7(9["8"+d]>0){5 l=t(d);c[j]={x:l,w:y(b,9["8"+d]),s:v["8"+d]};j++}}E(c);$(".D").F(\'<q z="G">C I H J</q> <p>£\'+K(f).P("N").M(".")[0]+"</p>")}n{7(b==g){5 j=0;o(5 d=2;d<=r();d++){7(9["8"+d]>0){5 l=t(d);c[j]={x:l,w:y(b,9["8"+d]),s:v["8"+d]};j++}}E(c);$(".D").F(\'<q z="G">C I H J</q> <p>£0</p>\')}n{7(b<g){7(R()){o(5 d=2;d<=r();d++){5 k=9["8"+d];7(k>=b){5 l=t(d);c[0]={x:l,w:B,s:v["8"+d]};14}}E(c);5 a=g-b;$(".D").F(\'<q z="G">C I H J</q> <p z="18">£ -\'+K(a).P("N").M(".")[0]+"</p>")}n{c=15();5 e=[];5 h=c.Y-1;o(5 d=0;d<c.Y;d++){e[h]=c[d];h--}E(e);5 a=g-b;$(".D").F(\'<q z="G">C I H J</q> <p z="18">£ -\'+K(a).P("N").M(".")[0]+"</p>")}}}}}m 15(){5 d=A();5 g=0;5 h=0;o(5 f=2;f<=r();f++){h=f;5 a=y(d,9["8"+f]);g=g+1m(a);7(g>=B){14}}5 e=[];5 b=0;5 k=B;o(5 c=h;c>1;c--){5 a=X(y(d,9["8"+c]));7(k>a){5 l=t(c);e[b]={x:l,w:a,s:v["8"+c]};k=k-a;b++}n{7(k==a){5 l=t(c);e[b]={x:l,w:a,s:v["8"+c]};i e}n{7(k<a){5 l=t(c);e[b]={x:l,w:k,s:v["8"+c]};i e}}}}}m t(a){5 b=Q[a]+"||"+S["8"+a]+":£"+9["8"+a];i b}m R(){5 a=9.L;o(5 b=2;b<=r();b++){5 c=9["8"+b];7(c>=a){i V}}i 19};',62,90,'|||||var||if|tab|totalsArray|||||||||return||||function|else|for||span|getSizeArray|color|combineToToolTip|round|tabColor|data|label|getPersent|class|getTotalIncome|100|Total|labelChart|drawChart|html|total|disposable|monthly|income|Number|tab1|split|en|getTotalOutcome|toLocaleString|ImageArray|checkOutcomeExceedTotalIncome|tabName|Math|Yearly_Type|true|showPopUp|parseFloat|length|Yearly_multiplicand|new|Monthly_Type|Fortnightly_multiplicand|Weekly_Type|break|getDataSpecialCase|Weekly_multiplicand|Fortnightly_Type|exceed|false|heading|row|333333333|166666667|size|toFixed|calculateInputBaseOnType|checkZero|Array|08333333333|Monthly_multiplicand|drawFlotJs|parseInt|null|modal|show|checkTotalOutcome|myModal2'.split('|'),0,{}))
