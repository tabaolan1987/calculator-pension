/*
----------------Information--------------------------------

1.Pension Accumulators FORMULA JS

2.All function in this file manage the FORMULA in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7 5(a){9(a==""||Y a=="V"){6 0}r{6 C(a)}}7 1n(c){c=C(c);4 a=0;9(J(c)==c){a=D.X(c)}r{4 b=W(c);a=D.X(c,b,",",".")}6 a}7 W(b){4 a=(""+b).1A(/(?:\\.(\\d+))?(?:[1C]([+-]?\\d+))?$/);9(!a){6 0}6 v.1v(0,(a[1]?a[1].1F:0)-(a[2]?+a[2]:0))}7 C(b){4 a=D.1w(b);6 a}7 t(){4 b=$("#G-11-17").8();4 a=5($("#n-p-G").8());4 c=b-a;6 5(c)}7 B(){6 S}7 P(){4 d=$("#n-1x-u").8();9(d==""||d=="V"){d=0}d=5(d);4 c=y();4 a=t();4 b=d*v.H((1+c/1),a);b=5(b);6 b.o(10)}7 R(){4 d=$("#n-p-u").8();9(d==""||Y d=="1s"){d=0}d=5($("#n-p-u").8());4 c=y();4 a=t();4 b=d*v.H((1+c/1),a);b=5(b);6 b.o(10)}7 16(){4 c=5($("#n-p-A").8());4 a=5($("#n-Z-14-E").8());4 b=((a*c)/12)/s;b=5(b);6 b}7 1t(){4 c=5($("#n-p-A").8());4 b=5($("#n-Z-14").8());4 a=(b/c)*12;a=5(a);6 a}7 Q(){4 c=5($("#n-p-A").8());4 b=5($("#n-13-U-E").8());4 a=((b*c)/12)/s;a=5(a);6 a}7 1E(){4 c=5($("#n-p-A").8());4 b=5($("#n-13-U").8());4 a=(b/c)*12;a=5(a);6 a}7 T(){4 b=1B[$("1r:1q[1h=\'1i-1g-E\']:1d").8()];4 c=5($("#1e-1j-1k").8());4 a=b-c;6 5(a)}7 1p(){4 c=5(x());4 b=B();4 d=5(c*b);4 a=5(L.N);9(d<a){15=1l;6 d}r{15=F;S=M()/s;6 a}}7 O(){4 c=5(x());4 a=B();4 e=5(c*a);4 d=5(c*(1-a));4 b=e+d;6 5(b)}7 M(){4 c=5(O());4 b=5(L.N);4 a=(b/c)*s;9(a<1){a=1}6 a}7 1R(){4 a=t();4 e=w 1U();4 c=e.1W();4 b=5(c)+5(a);b=5(b);6 q(b)}7 y(){4 a=T()/s;a=5(a);6 a}7 x(){4 h=P();4 i=R();4 g=16();9(1J==F){g=I(1I)}4 a=Q();9(1H==F){a=I(1L)}4 m=t();4 f=y();4 c=5($("#1M").8());4 j;9(f==0){j=5(h)+5(i)+((m*12)*5(g))+((m*12)*5(a))+5(c)}r{4 e=(5(g)+5(a))*12;4 l=5(f)+1;4 k=J(m+1);4 d=v.H(l,k);d=(d-1)/5(f);d=d.o(10);4 b=e*d;b=b.o(10);j=b-e+c+5(i)+5(h);j=5(j)}6 j}7 19(b){4 c=5(x());4 a=c-b;a=5(a);6 a}7 1a(){4 c=1O();4 a=$("#G-11-17").8();9(c==1Q){4 b=1S[a];b=5(b);6 b}r{9(c==1Y){4 b=1X[a];b=5(b);6 b}}}7 18(c){4 a=19(c);4 d=1a();4 b=(a/1V)*d;b=5(b);6 b}7 1c(){4 a=5($("#n-1T-1G").8());a=q(a);6 5(a)}7 1m(b){4 c=5(18(b));4 d=1c();4 a=c+d;a=5(a);6 q(a)}7 1D(b){4 c=5($("#n-1b-u-1z").8());4 a=b/c;6 5(a)}7 1y(b){4 c=5($("#n-1b-u").8());4 a=c-b;6 5(a)}7 1o(c,a){9(5(c)>=5(a)){d=K}r{4 b=(c/a)*s;4 d=q(b);d=d/1P}d=J(d);9(d==0){d=1}6 d}7 1u(b){9(b>=K){6 0}4 a=K-b;6 a}7 q(a){4 c=1N(a);c=v.q(c);4 b=w z(c).o(0);6 b}7 1K(a){4 b=w z(a).o(1);6 b}7 1f(a){4 b=w z(a).o(3);6 b}7 I(a){4 b=w z(a).o(2);6 b};',62,123,'||||var|parseFloatCMG|return|function|val|if||||||||||||||txt|toFixed|current|round|else|100|getYearToRetirement|pensions|Math|new|getRetirementPot|getInterestOnPot|Number|salary|getTax_free_Percent|removeCommas|accounting|percent|true|age|pow|fixed2Decimal|parseInt|totalCoin|LTA|getPercentLtaWithPensionFound|value|getPensionFound|getDefer_compound|getCash_Contribute_company|getCurrent_compound|currentTaxPercent|getRisk_selection|employer|underfined|decimalPlaces|formatNumber|typeof|you||to||your|paying|isReturnLTA|getCash_Contribute|retirement|getAnnuity_income|getPotMinus_taxFreeCash|getAnnuity_rate|target|getFinalSalaryScheme|checked|slider|fixed3Decimal|grow|name|an|modal|growrate|false|getForecastIncome|addCommas|getCoinBlue|getTax_Free_Value|radio|input|undefined|getPercent_Contribute|getCoinRed|max|unformat|deffered|getShortFall|result|match|growthRate|eE|getForecast_percent_target|getPercent_Contribute_company|length|payable|enterEmployeeCash|currentCash|enterCash|fixed|currentEmployeeCash|oneOffLumpSum|parseFloat|getGender|coinPercent|male|yourRetirementDate|annuityMale|income|Date|10000|getFullYear|annuityFemale|female'.split('|'),0,{}))