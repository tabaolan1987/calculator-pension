/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 10=1;5 Y=2;5 11=3;5 15=4;5 Z=4.1c;5 X=2.1i;5 1m=1;5 14=0.1n;m v(a){5 c=Q(a);c=12.v(c);5 b=13 C(c).1j(0);i b}m 1k(d,c){5 b=0;7(c==10){5 a=(d*Z);b=v(a)}o{7(c==Y){5 a=(d*X);b=v(a)}o{7(c==11){b=12.v(d)}o{7(c==15){7(d==6){b=1}o{5 a=d*14;b=v(a)}}}}}i b}5 9=13 1d();m D(){5 a=9.L;i a}m M(){5 a=0;n(5 b=2;b<=q();b++){a=a+9["8"+b]}i a}m y(b,c){5 a=(c/b)*A;a=v(a);i a}m q(){5 a=$(".1o-1e").1f();i a}m 1g(){5 a=1b;n(5 b=1;b<=q();b++){7(9["8"+b]==1l){V=W;i V}}i a}m 1u(){5 b=D();5 a=M();7(a>b){$("#1t").17("R")}}m 1r(){5 c=[];5 b=D();5 g=M();7(b>g){5 f=b-g;5 l=T[1]+"||"+S.L+":£"+f;c[0]={x:l,u:y(b,f),s:t.L};5 j=1;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=w(d);c[j]={x:l,u:y(b,9["8"+d]),s:t["8"+d]};j++}}K(c);7(f>A){1p(m(){$("#1s").17("R")},1q)}$(".G").H(\'<r z="I">F J E B</r> <p>£\'+C(f).N("P").O(".")[0]+"</p>")}o{7(b==g){5 j=0;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=w(d);c[j]={x:l,u:y(b,9["8"+d]),s:t["8"+d]};j++}}K(c);$(".G").H(\'<r z="I">F J E B</r> <p>£0</p>\')}o{7(b<g){7(16()){n(5 d=2;d<=q();d++){5 k=9["8"+d];7(k>=b){5 l=w(d);c[0]={x:l,u:A,s:t["8"+d]};18}}K(c);5 a=g-b;$(".G").H(\'<r z="I">F J E B</r> <p z="1a">£ -\'+C(a).N("P").O(".")[0]+"</p>")}o{c=19();5 e=[];5 h=c.U-1;n(5 d=0;d<c.U;d++){e[h]=c[d];h--}K(e);5 a=g-b;$(".G").H(\'<r z="I">F J E B</r> <p z="1a">£ -\'+C(a).N("P").O(".")[0]+"</p>")}}}}}m 19(){5 d=D();5 g=0;5 h=0;n(5 f=2;f<=q();f++){h=f;5 a=y(d,9["8"+f]);g=g+1h(a);7(g>=A){18}}5 e=[];5 b=0;5 k=A;n(5 c=h;c>1;c--){5 a=Q(y(d,9["8"+c]));7(k>a){5 l=w(c);e[b]={x:l,u:a,s:t["8"+c]};k=k-a;b++}o{7(k==a){5 l=w(c);e[b]={x:l,u:a,s:t["8"+c]};i e}o{7(k<a){5 l=w(c);e[b]={x:l,u:k,s:t["8"+c]};i e}}}}}m w(a){5 b=T[a]+"||"+S["8"+a]+":£"+9["8"+a];i b}m 16(){5 a=9.L;n(5 b=2;b<=q();b++){5 c=9["8"+b];7(c>=a){i W}}i 1b};',62,93,'|||||var||if|tab|totalsArray|||||||||return||||function|for|else||getSizeArray|span|color|tabColor|data|round|combineToToolTip|label|getPersent|class|100|income|Number|getTotalIncome|disposable|Total|labelChart|html|total|monthly|drawChart|tab1|getTotalOutcome|toLocaleString|split|en|parseFloat|show|tabName|ImageArray|length|showPopUp|true|Fortnightly_multiplicand|Fortnightly_Type|Weekly_multiplicand|Weekly_Type|Monthly_Type|Math|new|Yearly_multiplicand|Yearly_Type|checkOutcomeExceedTotalIncome|modal|break|getDataSpecialCase|exceed|false|333333333|Array|heading|size|checkZero|parseInt|166666667|toFixed|calculateInputBaseOnType|null|Monthly_multiplicand|08333333333|row|setTimeout|2000|drawFlotJs|myModal3|myModal2|checkTotalOutcome'.split('|'),0,{}))