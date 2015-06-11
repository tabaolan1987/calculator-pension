/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 10=1;5 W=2;5 R=3;5 12=4;5 11=4.1h;5 S=2.1g;5 1i=1;5 V=0.1j;m u(a){5 c=14(a);c=U.u(c);5 b=T J(c).1k(0);i b}m 1f(d,c){5 b=0;7(c==10){5 a=(d*11);b=u(a)}o{7(c==W){5 a=(d*S);b=u(a)}o{7(c==R){b=U.u(d)}o{7(c==12){7(d==6){b=1}o{5 a=d*V;b=u(a)}}}}}i b}5 9=T 1c();m B(){5 a=9.L;i a}m N(){5 a=0;n(5 b=2;b<=q();b++){a=a+9["8"+b]}i a}m y(b,c){5 a=(c/b)*A;a=u(a);i a}m q(){5 a=$(".1e-1m").1d();i a}m 1l(){5 a=18;n(5 b=1;b<=q();b++){7(9["8"+b]==1o){X=17;i X}}i a}m 1s(){5 b=B();5 a=N();7(a>b){$("#1q").Z("Y")}}m 1n(){5 c=[];5 b=B();5 g=N();7(b>g){5 f=b-g;5 l=16[1]+"||"+1b.L+":£"+f;c[0]={w:l,x:y(b,f),v:t.L};5 j=1;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=s(d);c[j]={w:l,x:y(b,9["8"+d]),v:t["8"+d]};j++}}E(c);7(f>A){$("#1p").Z("Y")}$(".I").D(\'<r z="G">C F H K</r> <p>£\'+J(f).P("M").O(".")[0]+"</p>")}o{7(b==g){5 j=0;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=s(d);c[j]={w:l,x:y(b,9["8"+d]),v:t["8"+d]};j++}}E(c);$(".I").D(\'<r z="G">C F H K</r> <p>£0</p>\')}o{7(b<g){7(19()){n(5 d=2;d<=q();d++){5 k=9["8"+d];7(k>=b){5 l=s(d);c[0]={w:l,x:A,v:t["8"+d]};15}}E(c);5 a=g-b;$(".I").D(\'<r z="G">C F H K</r> <p z="13">£ -\'+J(a).P("M").O(".")[0]+"</p>")}o{c=1a();5 e=[];5 h=c.Q-1;n(5 d=0;d<c.Q;d++){e[h]=c[d];h--}E(e);5 a=g-b;$(".I").D(\'<r z="G">C F H K</r> <p z="13">£ -\'+J(a).P("M").O(".")[0]+"</p>")}}}}}m 1a(){5 d=B();5 g=0;5 h=0;n(5 f=2;f<=q();f++){h=f;5 a=y(d,9["8"+f]);g=g+1r(a);7(g>=A){15}}5 e=[];5 b=0;5 k=A;n(5 c=h;c>1;c--){5 a=14(y(d,9["8"+c]));7(k>a){5 l=s(c);e[b]={w:l,x:a,v:t["8"+c]};k=k-a;b++}o{7(k==a){5 l=s(c);e[b]={w:l,x:a,v:t["8"+c]};i e}o{7(k<a){5 l=s(c);e[b]={w:l,x:k,v:t["8"+c]};i e}}}}}m s(a){5 b=16[a]+"||"+1b["8"+a]+":£"+9["8"+a];i b}m 19(){5 a=9.L;n(5 b=2;b<=q();b++){5 c=9["8"+b];7(c>=a){i 17}}i 18};',62,91,'|||||var||if|tab|totalsArray|||||||||return||||function|for|else||getSizeArray|span|combineToToolTip|tabColor|round|color|label|data|getPersent|class|100|getTotalIncome|Total|html|drawChart|monthly|total|disposable|labelChart|Number|income|tab1|en|getTotalOutcome|split|toLocaleString|length|Monthly_Type|Fortnightly_multiplicand|new|Math|Yearly_multiplicand|Fortnightly_Type|showPopUp|show|modal|Weekly_Type|Weekly_multiplicand|Yearly_Type|exceed|parseFloat|break|ImageArray|true|false|checkOutcomeExceedTotalIncome|getDataSpecialCase|tabName|Array|size|row|calculateInputBaseOnType|166666667|333333333|Monthly_multiplicand|08333333333|toFixed|checkZero|heading|drawFlotJs|null|myModal3|myModal2|parseInt|checkTotalOutcome'.split('|'),0,{}))