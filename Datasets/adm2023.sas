*** Created:    August 30, 2024                                ***;
*** Modify the path below to point to your data file.        ***;
***                                                          ***;
*** The specified subdirectory was not created on            ***;
*** your computer. You will need to do this.                 ***;
***                                                          ***;
*** This read program must be run against the specified      ***;
*** data file. This file is specified in the program         ***;
*** and must be saved separately.                            ***;
***                                                          ***;
*** Code was written for SAS version 8.0.                    ***;
*** Field names can be longer than 8 characters.             ***;
***                                                          ***;
*** This program does not provide frequencies or univariate  ***;
*** for all variables.                                      ***;
***                                                          ***;
*** This program does not include reserved values in its     ***;
*** calculations for missing values.  ***;
***                                                          ***;
*** There may be missing data for some institutions due      ***;
*** to the merge used to create this file.                   ***;
Data DCT;
infile 'e:\shares\ipeds\dct\adm2023.csv' delimiter=',' DSD MISSOVER firstobs=2 lrecl=32736;

informat
unitid      6. 
admcon1     2. 
admcon2     2. 
admcon3     2. 
admcon4     2. 
admcon5     2. 
admcon6     2. 
admcon7     2. 
admcon8     2. 
admcon9     2. 
admcon10    2. 
admcon11    2. 
admcon12    2. 
xapplcn     $1.
applcn      6. 
xapplcnm    $1.
applcnm     6. 
xapplcnw    $1.
applcnw     6. 
xapplcnan   $1.
applcnan    6. 
xapplcnun   $1.
applcnun    6. 
xadmssn     $1.
admssn      6. 
xadmssnm    $1.
admssnm     6. 
xadmssnw    $1.
admssnw     6. 
xadmssnan   $1.
admssnan    6. 
xadmssnun   $1.
admssnun    6. 
xenrlt      $1.
enrlt       6. 
xenrlm      $1.
enrlm       6. 
xenrlw      $1.
enrlw       6. 
xenrlan     $1.
enrlan      6. 
xenrlun     $1.
enrlun      6. 
xenrlft     $1.
enrlft      6. 
xenrlftm    $1.
enrlftm     6. 
xenrlftw    $1.
enrlftw     6. 
xenrlftan   $1.
enrlftan    6. 
xenrlftun   $1.
enrlftun    6. 
xenrlpt     $1.
enrlpt      6. 
xenrlptm    $1.
enrlptm     6. 
xenrlptw    $1.
enrlptw     6. 
xenrlptan   $1.
enrlptan    6. 
xenrlptun   $1.
enrlptun    6. 
xsatnum     $1.
satnum      6. 
xsatpct     $1.
satpct      3. 
xactnum     $1.
actnum      6. 
xactpct     $1.
actpct      3. 
xsatvr25    $1.
satvr25     3. 
xsatvr50    $1.
satvr50     3. 
xsatvr75    $1.
satvr75     3. 
xsatmt25    $1.
satmt25     3. 
xsatmt50    $1.
satmt50     3. 
xsatmt75    $1.
satmt75     3. 
xactcm25    $1.
actcm25     3. 
xactcm50    $1.
actcm50     3. 
xactcm75    $1.
actcm75     3. 
xacten25    $1.
acten25     3. 
xacten50    $1.
acten50     3. 
xacten75    $1.
acten75     3. 
xactmt25    $1.
actmt25     3. 
xactmt50    $1.
actmt50     3. 
xactmt75    $1.
actmt75     3.;

input
unitid      
admcon1     
admcon2     
admcon3     
admcon4     
admcon5     
admcon6     
admcon7     
admcon8     
admcon9     
admcon10    
admcon11    
admcon12    
xapplcn     $
applcn      
xapplcnm    $
applcnm     
xapplcnw    $
applcnw     
xapplcnan   $
applcnan    
xapplcnun   $
applcnun    
xadmssn     $
admssn      
xadmssnm    $
admssnm     
xadmssnw    $
admssnw     
xadmssnan   $
admssnan    
xadmssnun   $
admssnun    
xenrlt      $
enrlt       
xenrlm      $
enrlm       
xenrlw      $
enrlw       
xenrlan     $
enrlan      
xenrlun     $
enrlun      
xenrlft     $
enrlft      
xenrlftm    $
enrlftm     
xenrlftw    $
enrlftw     
xenrlftan   $
enrlftan    
xenrlftun   $
enrlftun    
xenrlpt     $
enrlpt      
xenrlptm    $
enrlptm     
xenrlptw    $
enrlptw     
xenrlptan   $
enrlptan    
xenrlptun   $
enrlptun    
xsatnum     $
satnum      
xsatpct     $
satpct      
xactnum     $
actnum      
xactpct     $
actpct      
xsatvr25    $
satvr25     
xsatvr50    $
satvr50     
xsatvr75    $
satvr75     
xsatmt25    $
satmt25     
xsatmt50    $
satmt50     
xsatmt75    $
satmt75     
xactcm25    $
actcm25     
xactcm50    $
actcm50     
xactcm75    $
actcm75     
xacten25    $
acten25     
xacten50    $
acten50     
xacten75    $
acten75     
xactmt25    $
actmt25     
xactmt50    $
actmt50     
xactmt75    $
actmt75    ;

label
unitid     ='Unique identification number of the institution' 
admcon1    ='Secondary school GPA' 
admcon2    ='Secondary school rank' 
admcon3    ='Secondary school record' 
admcon4    ='Completion of college-preparatory program' 
admcon5    ='Recommendations' 
admcon6    ='Formal demonstration of competencies' 
admcon7    ='Admission test scores' 
admcon8    ='English Proficiency Test' 
admcon9    ='Other Test (Wonderlic, WISC-III, etc.)' 
admcon10   ='Work experience' 
admcon11   ='Personal statement or essay' 
admcon12   ='Legacy status' 
xapplcn     ='Imputation field applcn - Applicants total'
applcn     ='Applicants total' 
xapplcnm    ='Imputation field applcnm - Applicants men'
applcnm    ='Applicants men' 
xapplcnw    ='Imputation field applcnw - Applicants women'
applcnw    ='Applicants women' 
xapplcnan   ='Imputation field applcnan - Applicants another gender'
applcnan   ='Applicants another gender' 
xapplcnun   ='Imputation field applcnun - Applicants gender unknown'
applcnun   ='Applicants gender unknown' 
xadmssn     ='Imputation field admssn - Admissions total'
admssn     ='Admissions total' 
xadmssnm    ='Imputation field admssnm - Admissions men'
admssnm    ='Admissions men' 
xadmssnw    ='Imputation field admssnw - Admissions women'
admssnw    ='Admissions women' 
xadmssnan   ='Imputation field admssnan - Admissions another gender'
admssnan   ='Admissions another gender' 
xadmssnun   ='Imputation field admssnun - Admissions gender unknown'
admssnun   ='Admissions gender unknown' 
xenrlt      ='Imputation field enrlt - Enrolled total'
enrlt      ='Enrolled total' 
xenrlm      ='Imputation field enrlm - Enrolled  men'
enrlm      ='Enrolled  men' 
xenrlw      ='Imputation field enrlw - Enrolled  women'
enrlw      ='Enrolled  women' 
xenrlan     ='Imputation field enrlan - Enrolled another gender'
enrlan     ='Enrolled another gender' 
xenrlun     ='Imputation field enrlun - Enrolled gender unknown'
enrlun     ='Enrolled gender unknown' 
xenrlft     ='Imputation field enrlft - Enrolled full time total'
enrlft     ='Enrolled full time total' 
xenrlftm    ='Imputation field enrlftm - Enrolled full time men'
enrlftm    ='Enrolled full time men' 
xenrlftw    ='Imputation field enrlftw - Enrolled full time women'
enrlftw    ='Enrolled full time women' 
xenrlftan   ='Imputation field enrlftan - Enrolled full time another gender'
enrlftan   ='Enrolled full time another gender' 
xenrlftun   ='Imputation field enrlftun - Enrolled full time gender unknown'
enrlftun   ='Enrolled full time gender unknown' 
xenrlpt     ='Imputation field enrlpt - Enrolled part time total'
enrlpt     ='Enrolled part time total' 
xenrlptm    ='Imputation field enrlptm - Enrolled part time men'
enrlptm    ='Enrolled part time men' 
xenrlptw    ='Imputation field enrlptw - Enrolled part time women'
enrlptw    ='Enrolled part time women' 
xenrlptan   ='Imputation field enrlptan - Enrolled part time another gender'
enrlptan   ='Enrolled part time another gender' 
xenrlptun   ='Imputation field enrlptun - Enrolled part time gender unknown'
enrlptun   ='Enrolled part time gender unknown' 
xsatnum     ='Imputation field satnum - Number of first-time degree/certificate-seeking students submitting SAT scores'
satnum     ='Number of first-time degree/certificate-seeking students submitting SAT scores' 
xsatpct     ='Imputation field satpct - Percent of first-time degree/certificate-seeking students submitting SAT scores'
satpct     ='Percent of first-time degree/certificate-seeking students submitting SAT scores' 
xactnum     ='Imputation field actnum - Number of first-time degree/certificate-seeking students submitting ACT scores'
actnum     ='Number of first-time degree/certificate-seeking students submitting ACT scores' 
xactpct     ='Imputation field actpct - Percent of first-time degree/certificate-seeking students submitting ACT scores'
actpct     ='Percent of first-time degree/certificate-seeking students submitting ACT scores' 
xsatvr25    ='Imputation field satvr25 - SAT Evidence-Based Reading and Writing 25th percentile score'
satvr25    ='SAT Evidence-Based Reading and Writing 25th percentile score' 
xsatvr50    ='Imputation field satvr50 - SAT Evidence-Based Reading and Writing 50th percentile score'
satvr50    ='SAT Evidence-Based Reading and Writing 50th percentile score' 
xsatvr75    ='Imputation field satvr75 - SAT Evidence-Based Reading and Writing 75th percentile score'
satvr75    ='SAT Evidence-Based Reading and Writing 75th percentile score' 
xsatmt25    ='Imputation field satmt25 - SAT Math 25th percentile score'
satmt25    ='SAT Math 25th percentile score' 
xsatmt50    ='Imputation field satmt50 - SAT Math 50th percentile score'
satmt50    ='SAT Math 50th percentile score' 
xsatmt75    ='Imputation field satmt75 - SAT Math 75th percentile score'
satmt75    ='SAT Math 75th percentile score' 
xactcm25    ='Imputation field actcm25 - ACT Composite 25th percentile score'
actcm25    ='ACT Composite 25th percentile score' 
xactcm50    ='Imputation field actcm50 - ACT Composite 50th percentile score'
actcm50    ='ACT Composite 50th percentile score' 
xactcm75    ='Imputation field actcm75 - ACT Composite 75th percentile score'
actcm75    ='ACT Composite 75th percentile score' 
xacten25    ='Imputation field acten25 - ACT English 25th percentile score'
acten25    ='ACT English 25th percentile score' 
xacten50    ='Imputation field acten50 - ACT English 50th percentile score'
acten50    ='ACT English 50th percentile score' 
xacten75    ='Imputation field acten75 - ACT English 75th percentile score'
acten75    ='ACT English 75th percentile score' 
xactmt25    ='Imputation field actmt25 - ACT Math 25th percentile score'
actmt25    ='ACT Math 25th percentile score' 
xactmt50    ='Imputation field actmt50 - ACT Math 50th percentile score'
actmt50    ='ACT Math 50th percentile score' 
xactmt75    ='Imputation field actmt75 - ACT Math 75th percentile score'
actmt75    ='ACT Math 75th percentile score';
run;

Proc Format;
value admcon1f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon2f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon3f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon4f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon5f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon6f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon7f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted (Test Optional)' 
3='Not considered for admission, even if submitted (Test Blind)';
value admcon8f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted (Test Optional)' 
3='Not considered for admission, even if submitted (Test Blind)';
value admcon9f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted (Test Optional)' 
3='Not considered for admission, even if submitted (Test Blind)';
value admcon10f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon11f
1='Required to be considered for admission' 
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value admcon12f
5='Not required for admission, but considered if submitted' 
3='Not considered for admission, even if submitted';
value $ximpflg  
A='Not applicable' 
B='Institution left item blank' 
C='Analyst corrected reported value' 
D='Do not know' 
G='Data generated from other data values' 
H='Value not derived - data not usable' 
J='Logical imputation' 
K='Ratio adjustment' 
L='Imputed using the Group Median procedure' 
N='Imputed using Nearest Neighbor procedure' 
P='Imputed using Carry Forward procedure' 
R='Reported' 
S='Suppressed - reported value less than 5' 
Y='Specific professional practice program n' 
Z='Implied zero';

Proc Freq;
Tables
admcon1    admcon2    admcon3    admcon4    admcon5    admcon6    admcon7    admcon8    admcon9   
admcon10   admcon11   admcon12   xapplcn    xapplcnm   xapplcnw   xapplcnan  xapplcnun  xadmssn    xadmssnm  
xadmssnw   xadmssnan  xadmssnun  xenrlt     xenrlm     xenrlw     xenrlan    xenrlun    xenrlft    xenrlftm  
xenrlftw   xenrlftan  xenrlftun  xenrlpt    xenrlptm   xenrlptw   xenrlptan  xenrlptun  xsatnum    xsatpct   
xactnum    xactpct    xsatvr25   xsatvr50   xsatvr75   xsatmt25   xsatmt50   xsatmt75   xactcm25   xactcm50  
xactcm75   xacten25   xacten50   xacten75   xactmt25   xactmt50   xactmt75    / missing;
format xapplcn   -character-xactmt75   $ximpflg.
admcon1  admcon1f.
admcon2  admcon2f.
admcon3  admcon3f.
admcon4  admcon4f.
admcon5  admcon5f.
admcon6  admcon6f.
admcon7  admcon7f.
admcon8  admcon8f.
admcon9  admcon9f.
admcon10  admcon10f.
admcon11  admcon11f.
admcon12  admcon12f.
;

Proc Summary print n sum mean min max;
var

applcn      applcnm     applcnw     applcnan    applcnun    admssn      admssnm    
admssnw     admssnan    admssnun    enrlt       enrlm       enrlw       enrlan      enrlun      enrlft      enrlftm    
enrlftw     enrlftan    enrlftun    enrlpt      enrlptm     enrlptw     enrlptan    enrlptun    satnum      satpct     
actnum      actpct      satvr25     satvr50     satvr75     satmt25     satmt50     satmt75     actcm25     actcm50    
actcm75     acten25     acten50     acten75     actmt25     actmt50     actmt75     ;
run;
