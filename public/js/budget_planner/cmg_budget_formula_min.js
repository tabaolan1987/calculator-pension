/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 10=1;5 Y=2;5 12=3;5 14=4;5 Z=4.1e;5 11=2.1i;5 1n=1;5 13=0.1l;m v(a){5 c=1b(a);c=15.v(c);5 b=16 D(c).1o(0);i b}m 1k(d,c){5 b=0;7(c==10){5 a=(d*Z);b=v(a)}o{7(c==Y){5 a=(d*11);b=v(a)}o{7(c==12){b=15.v(d)}o{7(c==14){7(d==6){b=1}o{5 a=d*13;b=v(a)}}}}}i b}5 9=16 1d();m E(){5 a=9.M;i a}m Q(){5 a=0;n(5 b=2;b<=q();b++){a=a+9["8"+b]}i a}m y(b,c){5 a=(c/b)*A;a=v(a);i a}m q(){5 a=$(".1f-1p").1g();i a}m 1h(){5 a=1c;n(5 b=1;b<=q();b++){7(9["8"+b]==1m){R=X;i R}}i a}m 1u(){5 b=E();5 a=Q();7(a>b){$("#1t").17("S")}}m 1q(){5 c=[];5 b=E();5 g=Q();7(b>g){5 f=b-g;5 l=V[1]+"||"+U.M+":£"+f;c[0]={x:l,u:y(b,f),s:t.M};5 j=1;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=w(d);c[j]={x:l,u:y(b,9["8"+d]),s:t["8"+d]};j++}}H(c);7(f>A){1r(m(){$("#1s").17("S")},1v)}$(".L").I(\'<r z="J">K G <F/>B C</r> <p>£\'+D(f).O("P").N(".")[0]+"</p>")}o{7(b==g){5 j=0;n(5 d=2;d<=q();d++){7(9["8"+d]>0){5 l=w(d);c[j]={x:l,u:y(b,9["8"+d]),s:t["8"+d]};j++}}H(c);$(".L").I(\'<r z="J">K G <F/>B C</r> <p>£0</p>\')}o{7(b<g){7(T()){n(5 d=2;d<=q();d++){5 k=9["8"+d];7(k>=b){5 l=w(d);c[0]={x:l,u:A,s:t["8"+d]};18}}H(c);5 a=g-b;$(".L").I(\'<r z="J">K G <F/>B C</r> <p z="1a">£ -\'+D(a).O("P").N(".")[0]+"</p>")}o{c=19();5 e=[];5 h=c.W-1;n(5 d=0;d<c.W;d++){e[h]=c[d];h--}H(e);5 a=g-b;$(".L").I(\'<r z="J">K G <F/>B C</r> <p z="1a">£ -\'+D(a).O("P").N(".")[0]+"</p>")}}}}}m 19(){5 d=E();5 g=0;5 h=0;n(5 f=2;f<=q();f++){h=f;5 a=y(d,9["8"+f]);g=g+1j(a);7(g>=A){18}}5 e=[];5 b=0;5 k=A;n(5 c=h;c>1;c--){5 a=1b(y(d,9["8"+c]));7(k>a){5 l=w(c);e[b]={x:l,u:a,s:t["8"+c]};k=k-a;b++}o{7(k==a){5 l=w(c);e[b]={x:l,u:a,s:t["8"+c]};i e}o{7(k<a){5 l=w(c);e[b]={x:l,u:k,s:t["8"+c]};i e}}}}}m w(a){5 b=V[a]+"||"+U["8"+a]+":£"+9["8"+a];i b}m T(){5 a=9.M;n(5 b=2;b<=q();b++){5 c=9["8"+b];7(c>=a){i X}}i 1c};',62,94,'|||||var||if|tab|totalsArray|||||||||return||||function|for|else||getSizeArray|span|color|tabColor|data|round|combineToToolTip|label|getPersent|class|100|disposable|income|Number|getTotalIncome|br|monthly|drawChart|html|total|Total|labelChart|tab1|split|toLocaleString|en|getTotalOutcome|showPopUp|show|checkOutcomeExceedTotalIncome|tabName|ImageArray|length|true|Fortnightly_Type|Weekly_multiplicand|Weekly_Type|Fortnightly_multiplicand|Monthly_Type|Yearly_multiplicand|Yearly_Type|Math|new|modal|break|getDataSpecialCase|exceed|parseFloat|false|Array|333333333|row|size|checkZero|166666667|parseInt|calculateInputBaseOnType|08333333333|null|Monthly_multiplicand|toFixed|heading|drawFlotJs|setTimeout|myModal3|myModal2|checkTotalOutcome|2000'.split('|'),0,{}))