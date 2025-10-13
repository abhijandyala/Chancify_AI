*** Created   August 30, 2024                                ***;
*** Modify the path below to point to your data file         ***.
 
*** The specified subdirectory was not created on your       ***.
*** computer. You will need to do this.                      ***.
 
*** The stat program must be run against the specified       ***.
*** data file. This file is specified in the program and     ***.
*** must be saved separately                                 ***.
 
*** This program does not provide frequencies or             ***.
*** descriptives for all variables                           ***.
 
*** This program does not include reserved values in its     ***.
*** calculations for missing values                          ***.
 
*** There may be missing data for some institutions due to   ***.
*** the merge used to create this file                       ***.

get data /type = txt
/file = 'e:\shares\ipeds\dct\adm2023.csv' 
/delcase = line
/delimiters = ","
/qualifier =  '"' 
/arrangement = delimited
/firstcase = 2
/importcase = all
/variables =
unitid       f6 
admcon1      f2 
admcon2      f2 
admcon3      f2 
admcon4      f2 
admcon5      f2 
admcon6      f2 
admcon7      f2 
admcon8      f2 
admcon9      f2 
admcon10     f2 
admcon11     f2 
admcon12     f2 
xapplcn     a1
applcn       f6 
xapplcnm    a1
applcnm      f6 
xapplcnw    a1
applcnw      f6 
xapplcnan   a1
applcnan     f6 
xapplcnun   a1
applcnun     f6 
xadmssn     a1
admssn       f6 
xadmssnm    a1
admssnm      f6 
xadmssnw    a1
admssnw      f6 
xadmssnan   a1
admssnan     f6 
xadmssnun   a1
admssnun     f6 
xenrlt      a1
enrlt        f6 
xenrlm      a1
enrlm        f6 
xenrlw      a1
enrlw        f6 
xenrlan     a1
enrlan       f6 
xenrlun     a1
enrlun       f6 
xenrlft     a1
enrlft       f6 
xenrlftm    a1
enrlftm      f6 
xenrlftw    a1
enrlftw      f6 
xenrlftan   a1
enrlftan     f6 
xenrlftun   a1
enrlftun     f6 
xenrlpt     a1
enrlpt       f6 
xenrlptm    a1
enrlptm      f6 
xenrlptw    a1
enrlptw      f6 
xenrlptan   a1
enrlptan     f6 
xenrlptun   a1
enrlptun     f6 
xsatnum     a1
satnum       f6 
xsatpct     a1
satpct       f3 
xactnum     a1
actnum       f6 
xactpct     a1
actpct       f3 
xsatvr25    a1
satvr25      f3 
xsatvr50    a1
satvr50      f3 
xsatvr75    a1
satvr75      f3 
xsatmt25    a1
satmt25      f3 
xsatmt50    a1
satmt50      f3 
xsatmt75    a1
satmt75      f3 
xactcm25    a1
actcm25      f3 
xactcm50    a1
actcm50      f3 
xactcm75    a1
actcm75      f3 
xacten25    a1
acten25      f3 
xacten50    a1
acten50      f3 
xacten75    a1
acten75      f3 
xactmt25    a1
actmt25      f3 
xactmt50    a1
actmt50      f3 
xactmt75    a1
actmt75      f3.

variable labels
unitid      'Unique identification number of the institution' 
admcon1     'Secondary school GPA' 
admcon2     'Secondary school rank' 
admcon3     'Secondary school record' 
admcon4     'Completion of college-preparatory program' 
admcon5     'Recommendations' 
admcon6     'Formal demonstration of competencies' 
admcon7     'Admission test scores' 
admcon8     'English Proficiency Test' 
admcon9     'Other Test (Wonderlic, WISC-III, etc.)' 
admcon10    'Work experience' 
admcon11    'Personal statement or essay' 
admcon12    'Legacy status' 
xapplcn     'Imputation field for applcn - Applicants total'
applcn      'Applicants total' 
xapplcnm    'Imputation field for applcnm - Applicants men'
applcnm     'Applicants men' 
xapplcnw    'Imputation field for applcnw - Applicants women'
applcnw     'Applicants women' 
xapplcnan   'Imputation field for applcnan - Applicants another gender'
applcnan    'Applicants another gender' 
xapplcnun   'Imputation field for applcnun - Applicants gender unknown'
applcnun    'Applicants gender unknown' 
xadmssn     'Imputation field for admssn - Admissions total'
admssn      'Admissions total' 
xadmssnm    'Imputation field for admssnm - Admissions men'
admssnm     'Admissions men' 
xadmssnw    'Imputation field for admssnw - Admissions women'
admssnw     'Admissions women' 
xadmssnan   'Imputation field for admssnan - Admissions another gender'
admssnan    'Admissions another gender' 
xadmssnun   'Imputation field for admssnun - Admissions gender unknown'
admssnun    'Admissions gender unknown' 
xenrlt      'Imputation field for enrlt - Enrolled total'
enrlt       'Enrolled total' 
xenrlm      'Imputation field for enrlm - Enrolled  men'
enrlm       'Enrolled  men' 
xenrlw      'Imputation field for enrlw - Enrolled  women'
enrlw       'Enrolled  women' 
xenrlan     'Imputation field for enrlan - Enrolled another gender'
enrlan      'Enrolled another gender' 
xenrlun     'Imputation field for enrlun - Enrolled gender unknown'
enrlun      'Enrolled gender unknown' 
xenrlft     'Imputation field for enrlft - Enrolled full time total'
enrlft      'Enrolled full time total' 
xenrlftm    'Imputation field for enrlftm - Enrolled full time men'
enrlftm     'Enrolled full time men' 
xenrlftw    'Imputation field for enrlftw - Enrolled full time women'
enrlftw     'Enrolled full time women' 
xenrlftan   'Imputation field for enrlftan - Enrolled full time another gender'
enrlftan    'Enrolled full time another gender' 
xenrlftun   'Imputation field for enrlftun - Enrolled full time gender unknown'
enrlftun    'Enrolled full time gender unknown' 
xenrlpt     'Imputation field for enrlpt - Enrolled part time total'
enrlpt      'Enrolled part time total' 
xenrlptm    'Imputation field for enrlptm - Enrolled part time men'
enrlptm     'Enrolled part time men' 
xenrlptw    'Imputation field for enrlptw - Enrolled part time women'
enrlptw     'Enrolled part time women' 
xenrlptan   'Imputation field for enrlptan - Enrolled part time another gender'
enrlptan    'Enrolled part time another gender' 
xenrlptun   'Imputation field for enrlptun - Enrolled part time gender unknown'
enrlptun    'Enrolled part time gender unknown' 
xsatnum     'Imputation field for satnum - Number of first-time degree/certificate-seeking students submitting SAT scores'
satnum      'Number of first-time degree/certificate-seeking students submitting SAT scores' 
xsatpct     'Imputation field for satpct - Percent of first-time degree/certificate-seeking students submitting SAT scores'
satpct      'Percent of first-time degree/certificate-seeking students submitting SAT scores' 
xactnum     'Imputation field for actnum - Number of first-time degree/certificate-seeking students submitting ACT scores'
actnum      'Number of first-time degree/certificate-seeking students submitting ACT scores' 
xactpct     'Imputation field for actpct - Percent of first-time degree/certificate-seeking students submitting ACT scores'
actpct      'Percent of first-time degree/certificate-seeking students submitting ACT scores' 
xsatvr25    'Imputation field for satvr25 - SAT Evidence-Based Reading and Writing 25th percentile score'
satvr25     'SAT Evidence-Based Reading and Writing 25th percentile score' 
xsatvr50    'Imputation field for satvr50 - SAT Evidence-Based Reading and Writing 50th percentile score'
satvr50     'SAT Evidence-Based Reading and Writing 50th percentile score' 
xsatvr75    'Imputation field for satvr75 - SAT Evidence-Based Reading and Writing 75th percentile score'
satvr75     'SAT Evidence-Based Reading and Writing 75th percentile score' 
xsatmt25    'Imputation field for satmt25 - SAT Math 25th percentile score'
satmt25     'SAT Math 25th percentile score' 
xsatmt50    'Imputation field for satmt50 - SAT Math 50th percentile score'
satmt50     'SAT Math 50th percentile score' 
xsatmt75    'Imputation field for satmt75 - SAT Math 75th percentile score'
satmt75     'SAT Math 75th percentile score' 
xactcm25    'Imputation field for actcm25 - ACT Composite 25th percentile score'
actcm25     'ACT Composite 25th percentile score' 
xactcm50    'Imputation field for actcm50 - ACT Composite 50th percentile score'
actcm50     'ACT Composite 50th percentile score' 
xactcm75    'Imputation field for actcm75 - ACT Composite 75th percentile score'
actcm75     'ACT Composite 75th percentile score' 
xacten25    'Imputation field for acten25 - ACT English 25th percentile score'
acten25     'ACT English 25th percentile score' 
xacten50    'Imputation field for acten50 - ACT English 50th percentile score'
acten50     'ACT English 50th percentile score' 
xacten75    'Imputation field for acten75 - ACT English 75th percentile score'
acten75     'ACT English 75th percentile score' 
xactmt25    'Imputation field for actmt25 - ACT Math 25th percentile score'
actmt25     'ACT Math 25th percentile score' 
xactmt50    'Imputation field for actmt50 - ACT Math 50th percentile score'
actmt50     'ACT Math 50th percentile score' 
xactmt75    'Imputation field for actmt75 - ACT Math 75th percentile score'
actmt75     'ACT Math 75th percentile score'.

value labels
/admcon1   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon2   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon3   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon4   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon5   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon6   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon7   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted (Test Optional)' 
3 'Not considered for admission, even if submitted (Test Blind)' 
/admcon8   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted (Test Optional)' 
3 'Not considered for admission, even if submitted (Test Blind)' 
/admcon9   
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted (Test Optional)' 
3 'Not considered for admission, even if submitted (Test Blind)' 
/admcon10  
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon11  
1 'Required to be considered for admission' 
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted' 
/admcon12  
5 'Not required for admission, but considered if submitted' 
3 'Not considered for admission, even if submitted'.
*The following are the possible values for the item imputation field variables
*A  'Not applicable'
*B  'Institution left item blank'
*C  'Analyst corrected reported value'
*D  'Do not know'
*G  'Data generated from other data values'
*H  'Value not derived - data not usable'
*J  'Logical imputation'
*K  'Ratio adjustment'
*L  'Imputed using the Group Median procedure'
*N  'Imputed using Nearest Neighbor procedure'
*P  'Imputed using Carry Forward procedure'
*R  'Reported'
*S  'Suppressed - reported value less than 5'
*Y  'Specific professional practice program n'
*Z  'Implied zero'

frequencies variables=
admcon1     admcon2     admcon3     admcon4     admcon5     admcon6     admcon7     admcon8     admcon9    
admcon10    admcon11    admcon12    xapplcn     xapplcnm    xapplcnw    xapplcnan   xapplcnun   xadmssn     xadmssnm   
xadmssnw    xadmssnan   xadmssnun   xenrlt      xenrlm      xenrlw      xenrlan     xenrlun     xenrlft     xenrlftm   
xenrlftw    xenrlftan   xenrlftun   xenrlpt     xenrlptm    xenrlptw    xenrlptan   xenrlptun   xsatnum     xsatpct    
xactnum     xactpct     xsatvr25    xsatvr50    xsatvr75    xsatmt25    xsatmt50    xsatmt75    xactcm25    xactcm50   
xactcm75    xacten25    xacten50    xacten75    xactmt25    xactmt50    xactmt75    .

descriptives variables=
applcn      applcnm     applcnw     applcnan    applcnun    admssn      admssnm    
admssnw     admssnan    admssnun    enrlt       enrlm       enrlw       enrlan      enrlun      enrlft      enrlftm    
enrlftw     enrlftan    enrlftun    enrlpt      enrlptm     enrlptw     enrlptan    enrlptun    satnum      satpct     
actnum      actpct      satvr25     satvr50     satvr75     satmt25     satmt50     satmt75     actcm25     actcm50    
actcm75     acten25     acten50     acten75     actmt25     actmt50     actmt75    
/stats=def.

save outfile='adm2023.sav' /compressed.
