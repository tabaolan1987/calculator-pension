/*
----------------Information--------------------------------

1.Pension Accumulators FORMULA JS

2.All function in this file manage the FORMULA in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7 5(a){n(a==""||R a=="U"){6 0}s{6 E(a)}}7 1C(c){c=E(c);4 a=0;n(G(c)==c){a=B.16(c)}s{4 b=11(c);a=B.16(c,b,",",".")}6 a}7 11(b){4 a=(""+b).1E(/(?:\\.(\\d+))?(?:[1F]([+-]?\\d+))?$/);n(!a){6 0}6 t.1u(0,(a[1]?a[1].1J:0)-(a[2]?+a[2]:0))}7 E(b){4 a=B.1I(b);6 a}7 v(){4 b=$("#C-P-J").8();4 a=5($("#9-o-C").8());4 c=b-a;6 5(c)}7 D(){6 T}7 L(){4 d=$("#9-1K-u").8();n(d==""||d=="U"){d=0}d=5(d);4 c=w();4 a=v();4 b=d*t.A((1+c/1),a);b=5(b);6 b.p(10)}7 O(){4 d=$("#9-o-u").8();n(d==""||R d=="1L"){d=0}d=5($("#9-o-u").8());4 c=w();4 a=v();4 b=d*t.A((1+c/1),a);b=5(b);6 b.p(10)}7 Y(){4 c=5($("#9-o-x").8());4 a=5($("#9-S-M-F").8());4 b=((a*c)/12)/q;b=5(b);6 b}7 1M(){4 c=5($("#9-o-x").8());4 b=5($("#9-S-M").8());4 a=(b/c)*12;a=5(a);6 a}7 V(){4 c=5($("#9-o-x").8());4 b=5($("#9-17-13-F").8());4 a=((b*c)/12)/q;a=5(a);6 a}7 1d(){4 c=5($("#9-o-x").8());4 b=5($("#9-17-13").8());4 a=(b/c)*12;a=5(a);6 a}7 N(){4 b=1f[$("1g:1b[1r=\'1o-1h-F\']:1q").8()];4 c=5($("#1m-1i-1j").8());4 a=b-c;6 5(a)}7 1k(){4 c=5(y());4 b=D();4 d=5(c*b);4 a=5(X.W);n(d<a){19=1l;6 d}s{19=1p;T=K()/q;6 a}}7 Q(){4 c=5(y());4 a=D();4 e=5(c*a);4 d=5(c*(1-a));4 b=e+d;6 5(b)}7 K(){4 c=5(Q());4 b=5(X.W);4 a=(b/c)*q;n(a<1){a=1}6 a}7 1e(){4 a=v();4 e=z 1c();4 c=e.1n();4 b=5(c)+5(a);b=5(b);6 r(b)}7 w(){4 a=N()/q;a=5(a);6 a}7 y(){4 h=L();4 i=O();4 g=Y();4 a=V();4 m=v();4 f=w();4 c=5($("#1N").8());4 j;n(f==0){j=5(h)+5(i)+((m*12)*5(g))+((m*12)*5(a))+5(c)}s{4 e=(5(g)+5(a))*12;4 l=5(f)+1;4 k=G(m+1);4 d=t.A(l,k);d=(d-1)/5(f);d=d.p(10);4 b=e*d;b=b.p(10);j=b-e+c+5(i)+5(h);j=5(j)}6 j}7 1a(b){4 c=5(y());4 a=c-b;a=5(a);6 a}7 18(){4 c=1s();4 a=$("#C-P-J").8();n(c==1O){4 b=1T[a];b=5(b);6 b}s{n(c==1S){4 b=1R[a];b=5(b);6 b}}}7 Z(c){4 a=1a(c);4 d=18();4 b=(a/1P)*d;b=5(b);6 b}7 14(){4 a=5($("#9-1Q-1H").8());a=r(a);6 5(a)}7 1G(b){4 c=5(Z(b));4 d=14();4 a=c+d;a=5(a);6 r(a)}7 1x(b){4 c=5($("#9-15-u-1y").8());4 a=b/c;6 5(a)}7 1w(b){4 c=5($("#9-15-u").8());4 a=c-b;6 5(a)}7 1v(c,a){n(5(c)>=5(a)){d=I}s{4 b=(c/a)*q;4 d=r(b);d=d/1t}d=G(d);n(d==0){d=1}6 d}7 1z(b){n(b>=I){6 0}4 a=I-b;6 a}7 r(a){4 c=1A(a);c=t.r(c);4 b=z H(c).p(0);6 b}7 1D(a){4 b=z H(a).p(1);6 b}7 1B(a){4 b=z H(a).p(3);6 b};',62,118,'||||var|parseFloatCMG|return|function|val|txt||||||||||||||if|current|toFixed|100|round|else|Math|pensions|getYearToRetirement|getInterestOnPot|salary|getRetirementPot|new|pow|accounting|age|getTax_free_Percent|removeCommas|percent|parseInt|Number|totalCoin|retirement|getPercentLtaWithPensionFound|getDefer_compound|paying|getRisk_selection|getCurrent_compound|to|getPensionFound|typeof|you|currentTaxPercent|underfined|getCash_Contribute_company|value|LTA|getCash_Contribute|getAnnuity_income||decimalPlaces||employer|getFinalSalaryScheme|target|formatNumber|your|getAnnuity_rate|isReturnLTA|getPotMinus_taxFreeCash|radio|Date|getPercent_Contribute_company|yourRetirementDate|growthRate|input|grow|modal|growrate|getTax_Free_Value|false|slider|getFullYear|an|true|checked|name|getGender|coinPercent|max|getCoinBlue|getShortFall|getForecast_percent_target|result|getCoinRed|parseFloat|fixed3Decimal|addCommas|fixed|match|eE|getForecastIncome|payable|unformat|length|deffered|undefined|getPercent_Contribute|oneOffLumpSum|male|10000|income|annuityFemale|female|annuityMale'.split('|'),0,{}))