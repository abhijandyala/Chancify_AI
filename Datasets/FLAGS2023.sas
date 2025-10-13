*** Created: 10-2025                                         ***;
*** Modify the path below to point to your data file.        ***;
***                                                          ***;
*** The specified subdirectory was not created on            ***;
*** your computer. You will need to do this.                 ***;
***                                                          ***;
*** This read program must be ran against the specified      ***;
*** data file. This file is specified in the program         ***;
*** and must be saved separately.                            ***;
***                                                          ***;
*** Code was written for SAS version 8.0.                    ***;
*** Field names can be longer than 8 characters.             ***;
***                                                          ***;
*** This program does not provide frequencies or univariate  ***;
*** for all variables.                                       ***;
***                                                          ***;
*** This program does not include reserved values in its     ***;
*** calculations for missing values.                         ***;
***                                                          ***;
*** There may be missing data for some institutions due      ***;
*** to the merge used to create this file.                   ***;


data dct;
infile "c:\data\flags2023.csv" delimiter=',' dsd missover firstobs=2 lrecl=32736; 


informat
unitid            6.
stat_ic           2.
lock_ic           2.
imp_ic            2.
stat_c            2.
lock_c            2.
prch_c            2.
idx_c             6.
pcc_f             2.
imp_c             2.
stat_e12          2.
lock_e12          2.
prch_e12          2.
idx_e12           6.
pce12_f           2.
imp_e12           2.
stat_sfa          2.
lock_sfa          2.
prch_sfa          2.
idx_sfa           6.
pcsfa_f           2.
imp_sfa           2.
sfaform           2.
stat_gr           2.
lock_gr           2.
prch_gr           2.
idx_gr            6.
pcgr_f            2.
imp_gr            2.
cohrtstu          2.
stat_gr2          2.
lock_gr2          2.
prch_gr2          2.
idx_gr2           6.
pcgr2_f           2.
imp_gr2           2.
stat_om           2.
lock_om           2.
prch_om           2.
idx_om            6.
pcom_f            2.
imp_om            2.
stat_adm          2.
lock_adm          2.
prch_adm          2.
idx_adm           6.
pcadm_f           2.
imp_adm           2.
stat_hr           2.
lock_hr           2.
prch_hr           2.
idx_hr            6.
pchr_f            2.
imp_hr            2.
ftemp15           2.
tenursys          2.
sa_excl           2.
stat_eap          2.
stat_sa           2.
stat_s            2.
stat_ef           2.
lock_ef           2.
prch_ef           2.
idx_ef            6.
pcef_f            2.
imp_ef            2.
pta99_ef          2.
ptacipef          2.
ptb_ef            2.
ptc_ef            2.
ptd_ef            2.
stat_f            2.
lock_f            2.
prch_f            2.
idx_f             6.
pcf_f             2.
prchtp_f          2.
imp_f             2.
form_f            2.
fybeg             $6.
fyend             $6.
gpfs              2.
f1gasbal          2.
f2pell            2.
f3pell            2.
fcolathl          2.
f_athex1          2.
f_athex2          2.
f_athex9          2.
f_athrv           2.
f_athrv1          2.
f_athrv2          2.
f_athrv9          2.
f3bist            2.
stat_al           2.
lock_al           2.
prch_al           2.
idx_al            6.
pcal_f            2.
imp_al            2.
hasal             2.
ntrldstr          2.;

input
unitid
stat_ic
lock_ic
imp_ic
stat_c
lock_c
prch_c
idx_c
pcc_f
imp_c
stat_e12
lock_e12
prch_e12
idx_e12
pce12_f
imp_e12
stat_sfa
lock_sfa
prch_sfa
idx_sfa
pcsfa_f
imp_sfa
sfaform
stat_gr
lock_gr
prch_gr
idx_gr
pcgr_f
imp_gr
cohrtstu
stat_gr2
lock_gr2
prch_gr2
idx_gr2
pcgr2_f
imp_gr2
stat_om
lock_om
prch_om
idx_om
pcom_f
imp_om
stat_adm
lock_adm
prch_adm
idx_adm
pcadm_f
imp_adm
stat_hr
lock_hr
prch_hr
idx_hr
pchr_f
imp_hr
ftemp15
tenursys
sa_excl
stat_eap
stat_sa
stat_s
stat_ef
lock_ef
prch_ef
idx_ef
pcef_f
imp_ef
pta99_ef
ptacipef
ptb_ef
ptc_ef
ptd_ef
stat_f
lock_f
prch_f
idx_f
pcf_f
prchtp_f
imp_f
form_f
fybeg             $
fyend             $
gpfs
f1gasbal
f2pell
f3pell
fcolathl
f_athex1
f_athex2
f_athex9
f_athrv
f_athrv1
f_athrv2
f_athrv9
f3bist
stat_al
lock_al
prch_al
idx_al
pcal_f
imp_al
hasal
ntrldstr;

label
unitid            ='Unique identification number of the institution'
stat_ic           ='Response status -  Institutional characteristics component'
lock_ic           ='Status of IC component when institution was migrated'
imp_ic            ='Type of imputation method Institutional Characteristics'
stat_c            ='Response status -  Completions component'
lock_c            ='Status of completions component when institution was migrated'
prch_c            ='Parent/child indicator for completions'
idx_c             ='UnitID of Parent institution'
pcc_f             ='Parent/child allocation factor - Completions'
imp_c             ='Type of imputation method Completions'
stat_e12          ='Response status of institution - 12-month enrollment'
lock_e12          ='Status of 12-month enrollment component whe data collection closed'
prch_e12          ='Parent/child indicator for 12-month enrollment'
idx_e12           ='ID number of parent institution - 12-month enrollment'
pce12_f           ='Parent/child allocation factor - 12-month enrollment'
imp_e12           ='Type of imputation method - 12 month enrollment'
stat_sfa          ='Response status for Student Financial Aid survey'
lock_sfa          ='Status of Student Financial Aid Survey when data collection closed'
prch_sfa          ='Parent/child indicator Student Financial Aid survey'
idx_sfa           ='ID number of parent institution Student Financial Aid'
pcsfa_f           ='Parent/child allocation factor - Student Financial Aid'
imp_sfa           ='Type of imputation method Student Financial Aid'
sfaform           ='SFA collection form type'
stat_gr           ='Response status - Graduation Rates'
lock_gr           ='Status of Graduation rate survey when data collection closed'
prch_gr           ='Parent/child indicator - Graduation Rates'
idx_gr            ='UNITID of parent institution reporting Graduation Rates'
pcgr_f            ='Parent/child allocation factor - Graduation Rates'
imp_gr            ='Imputation method - Graduation Rates'
cohrtstu          ='Enrolled any full-time first-time students'
stat_gr2          ='Response status - Graduation Rates 200'
lock_gr2          ='Status of Graduation rate 200 survey when data collection closed'
prch_gr2          ='Parent/child indicator - Graduation Rates 200'
idx_gr2           ='UNITID of parent institution reporting Graduation Rates 200'
pcgr2_f           ='Parent/child allocation factor - Graduation Rates 200'
imp_gr2           ='Imputation method - Graduation Rates 200'
stat_om           ='Response status - Outcome Measures'
lock_om           ='Status of Outcome Measures component when data collection closed'
prch_om           ='Parent/child indicator - Outcome Measures'
idx_om            ='UNITID of parent institution reporting Outcome Measures'
pcom_f            ='Parent/child allocation factor - Outcome Measures'
imp_om            ='Imputations method - Outcome Measures'
stat_adm          ='Response status - Admissions component'
lock_adm          ='Status of admissions component when institution was migrated'
prch_adm          ='Parent/child indicator for Admissions'
idx_adm           ='ID number of parent institution - Admissions'
pcadm_f           ='Parent/child allocation factor - Admissions'
imp_adm           ='Type of imputation method - Admissions component'
stat_hr           ='Response status of institution for Human Resources (HR) component'
lock_hr           ='Status of Human Resources (HR) component when data collection closed'
prch_hr           ='Parent/child  indicator - Human Resources (HR) component'
idx_hr            ='ID of institution where data are reported for the Human Resources (HR) component'
pchr_f            ='Parent/child allocation factor - HR'
imp_hr            ='Type of Imputation method - Human Resources (HR) component'
ftemp15           ='Does institution have 15 or more full-time employees'
tenursys          ='Does institution have a tenure system'
sa_excl           ='Salary exclusion'
stat_eap          ='Response status for EAP'
stat_sa           ='Response status to SA survey'
stat_s            ='Response status for Fall Staff'
stat_ef           ='Response status of institution -  Fall enrollment'
lock_ef           ='Status of Fall Enrollment survey when data collection closed'
prch_ef           ='Parent/child indicator f- Fall enrollment'
idx_ef            ='ID number of parent institution - Fall enrollment'
pcef_f            ='Parent/child allocation factor - Fall enrollment'
imp_ef            ='Type of imputation method - Fall enrollment'
pta99_ef          ='Status enrollment by race/ethnicity (99.0000 CIP)'
ptacipef          ='Status enrollment by major'
ptb_ef            ='Status enrollment summary by age'
ptc_ef            ='Status residence of first-time first-year students'
ptd_ef            ='Status total entering class and retention rates'
stat_f            ='Response status for Finance survey'
lock_f            ='Status of Finance survey when data collection closed'
prch_f            ='Parent/child indicator - Finance'
idx_f             ='ID number of parent institution - Finance'
pcf_f             ='Parent/child allocation factor - Finance'
prchtp_f          ='Parent/child system indicator - Finance'
imp_f             ='Type of imputation method  Finance'
form_f            ='Identifies reporting standards GASB, FASB, or modified FASB(for-profit institutions) used to report finance data'
fybeg             ='Beginning date of fiscal year covered (all finance)'
fyend             ='End date of fiscal year covered  (all finance)'
gpfs              ='Audit Opinion GPFS from auditor (all finance)'
f1gasbal          ='GASB alternative accounting model'
f2pell            ='Account for Pell grants as pass through transactions or as federal grant revenues to the institution (FASB  institutions)?'
f3pell            ='Account for Pell grants as pass through transactions or as federal grant revenues to the institution (private-for-profit institutions)?'
fcolathl          ='Participates in intercollegiate athletics'
f_athex1          ='Intercollegiate athletic expenses accounted for as auxiliary enterprises'
f_athex2          ='Intercollegiate athletic expenses accounted for as student services'
f_athex9          ='Intercollegiate athletic expenses accounted for as other expense functional classification'
f_athrv           ='Intercollegiate athletic revenues'
f_athrv1          ='Are intercollegiate athletic revenues included with sales and services of educational activities'
f_athrv2          ='Are intercollegiate athletic revenues included with sales and services of auxiliary enterprises'
f_athrv9          ='Are intercollegiate athletic revenues included with a source other than educational activities or auxiliary enterprises'
f3bist            ='Type of business structure for tax purposes (private-for-profit, degree-granting institutions)'
stat_al           ='Response status -  Academic Libraries component'
lock_al           ='Status of Academic Library component when institution was migrated'
prch_al           ='Parent/child indicator for Academic Libraries'
idx_al            ='UnitID of Parent institution - Academic Libraries'
pcal_f            ='Parent/child allocation factor - Academic Libraries'
imp_al            ='Type of imputation method - Academic Libraries'
hasal             ='Has an academic library'
ntrldstr          ='Natural Disaster identification'
run;

Proc Format;
value stat_ic
1='Respondent'
2='Partial respondent, imputed'
3='Partial respondent, not imputed'
5='Nonrespondent, not imputed'
-9='Not active';
value lock_ic
0='No data'
8='Complete, final lock applied'
-2='Not applicable';
value stat_adm
1='Respondent'
2='Partial respondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_adm
8='Complete, final lock applied'
0='No data submitted'
-2='Not applicable';
value imp_adm
1='Carry forward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value imp_ic
1='Carry forward (CF)'
-2='Not applicable';
value ntrldstr
0='No';
value prch_adm
-2='Not applicable';
value stat_ef
1='Respondent'
2='Partial respondent imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_ef
0='No data submitted'
8='Complete, final lock applied'
-2='Not applicable';
value prch_ef
1='Parent record includes data from child campuses'
2='Child record - data reported with parent campus'
-2='Not applicable';
value imp_ef
1='Carry foreward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value pta99_ef
1='Respondent'
4='Nonrespondent imputed'
5='Nonrespondent not imputed'
-2='Not applicable'
-9='{Not active}';
value ptb_ef
1='Respondent'
4='Nonrespondent imputed'
5='Nonrespondent not imputed'
-2='Not applicable'
-9='Not active';
value ptc_ef
1='Respondent'
5='Nonrespondent not imputed'
-2='Not applicable'
-9='Not active';
value ptd_ef
1='Respondent'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value ptacipef
-2='Not applicable'
-9='Not active';
value stat_e12f
1='Respondent'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_e12f
0='No data submitted'
8='Complete, final lock applied'
-2='Not applicable';
value prch_e12f
1='Parent record includes data from child campuses'
2='Child record - data reported with parent campus'
-2='Not applicable';
value imp_e12f
-2='Not applicable';
value stat_c
1='Respondent'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_c
0='No data submitted'
8='Complete, final lock applied'
-2='Not applicable';
value prch_c
1='Parent record includes data from child campuses'
2='Child record - all data reported with parent campus'
-2='Not applicable';
value imp_c
-2='Not applicable';
value sa_excl
1='Yes'
2='No'
-2='Not applicable'
-1='Not reported';
value stat_sa
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value stat_s
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value ftemp15f
1='Yes'
2='No'
-1='Not reported'
-2='Not applicable';
value form_f
4='GASB Reporting Standards 34/35'
2='FASB Reporting Standards'
3='Private for-profit institutions'
-1='Not reported'
-2='Not applicable';
value stat_f
1='Respondent'
2='Partial respondent imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_f
8='Complete, final lock applied'
0='No data submitted'
3='Edited, some errors/warnings remain'
-2='Not applicable';
value prchtp_f
1='Full parent/child system'
2='Partial parent child system (1)'
3='Partial parent child system (2)'
5='System with partial reporting children campuses of NON-IPEDS entity'
-2='Not applicable';
value prch_f
1='Parent record - includes data from branch campuses'
2='Child record - data reported with parent campus'
3='Partial child record - reports revenues/expenses. Assets/liabilties reported with parent'
6='Partial parent/child record - reports revenues/expenses that also includes data from other branch campuses. Assets/liabilties reported with parent'
5='Child record - reports partial data but other data is included  with entity that is not a postsecondary institution'
-2='Not applicable';
value imp_f
1='Carry foreward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value $fybeg
'012022'='January 2022'
'022022'='February 2022'
'032022'='March 2022'
'042022'='April 2022'
'052022'='May 2022'
'062022'='June 2022'
'072022'='July 2022'
'082022'='August 2022'
'092022'='September 2022'
'102022'='October 2022'
'112021'='November 2021'
'122021'='December 2021'
'-1'='Not reported'
'-2'='Not applicable';
value $fyend
'102022'='October 2022'
'112022'='November 2022'
'122022'='December 2022'
'012023'='January 2023'
'022023'='February 2023'
'032023'='March 2023'
'042023'='April 2023'
'052023'='May 2023'
'062023'='June 2023'
'072023'='July 2023'
'082023'='August 2023'
'092023'='September 2023'
'-1'='Not reported'
'-2'='Not applicable';
value gpfs
1='Yes (unqualified)'
2='No (qualified)'
3='Do not know'
-1='Not reported'
-2='Not applicable';
value f1gasbal
1='Business Type Activities'
2='Governmental Activities'
3='Governmental Activities with Business-Type Activities'
-1='Not reported'
-2='Not applicable';
value f2pell
1='Pass through (agency)'
2='Federal grants'
3='Does not award Pell grants'
-1='Not reported'
-2='Not applicable';
value f3pell
1='Pass through (agency)'
3='Does not award Pell grants'
-1='Not reported'
-2='Not applicable';
value f_athrv1f
1='Yes, included with sales and services of educational activities'
0='Not included with sales and services of educational activities'
-1='Not reported'
-2='Not applicable';
value f_athrv2f
1='Yes, included with sales and services of auxiliary enterprises'
0='Not included with sales and services of auxiliary enterprises'
-1='Not reported'
-2='Not applicable';
value f_athrv9f
1='Yes, included with sources other than sales and services'
0='Not included with sources other than sales and services'
-1='Not reported'
-2='Not applicable';
value fcolathl
1='Yes'
2='No'
-1='Not reported'
-2='Not applicable';
value f_athex1f
1='Yes, accounted for as auxiliary enterprises'
0='Not accounted for as auxlliary enterprises'
-1='Not reported'
-2='Not applicable';
value f_athex2f
1='Yes, accounted for as student services'
0='Not accounted for as student services'
-1='Not reported'
-2='Not applicable';
value f_athex9f
1='Yes, accounted for as other expense functional category'
0='Not accounted for as other expense functional category'
-1='Not reported'
-2='Not applicable';
value f_athrv
1='Has athletic revenues'
2='Does not have athletic revenues'
-1='Not reported'
-2='Not applicable';
value f3bist
1='Sole Proprietorship'
2='Partnership (General, Limited, Limited Liability)'
3='C Corporation'
4='S Corporation'
5='Limited Liability Company (LLC)'
-1='Not reported'
-2='Not applicable';
value stat_sfa
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_sfa
8='Complete, final lock applied'
0='No data submitted'
3='Edited, some errors/warnings remain'
-2='Not applicable';
value prch_sfa
1='Parent record - includes data from branch campuses'
2='Child record - data reported with parent campus'
-2='Not applicable';
value imp_sfa
1='Carry forward (CF)'
-2='Not applicable';
value sfaform
1='Undergraduate student financial and undergraduate military servicemembers/veteran^s benefits are applicable'
2='Undergraduate student financial and undergraduate and graduate military servicemembers/veteran^s benefits are applicable'
3='Graduate military servicemembers/veteran^s benefits screens are applicable'
-2='Not applicable';
value stat_gr
1='Respondent'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_gr
0='No data submitted'
8='Complete'
-2='Not applicable';
value prch_gr
-2='Not applicable';
value imp_gr
1='Carry foreward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value cohrtstu
1='Yes'
2='No, did not enroll full-time, first-time (undergraduate) students'
3='No, did not offer programs at or below the baccalaureate level'
4='No, institution was not in operation in cohort year'
-1='Not reported'
-2='Not applicable';
value stat_gr2f
1='Respondent'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_gr2f
0='No data submitted'
8='Complete'
-2='Not applicable';
value prch_gr2f
-2='Not applicable';
value imp_gr2f
1='Carry foreward (CF)'
-2='Not applicable';
value stat_om
1='Respondent'
2='Partial respondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_om
0='No data submitted'
8='Complete'
-2='Not applicable';
value prch_om
-2='Not applicable';
value imp_om
1='Carry foreward (CF)'
-2='Not applicable';
value stat_eap
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value stat_hr
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value imp_hr
1='Carry foreward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value lock_hr
0='No data submitted'
8='Complete, final lock applied'
-2='Not applicable';
value prch_hr
1='Parent record includes data from child campuses'
2='Child record - all data reported with parent campus'
-2='Not applicable';
value tenursys
1='Has tenure system'
2='No tenure system'
-1='Not reported'
-2='Not applicable';
value stat_al
1='Respondent'
2='Partial respondent, imputed'
4='Nonrespondent, imputed'
5='Nonrespondent, not imputed'
-2='Not applicable'
-9='Not active';
value lock_al
0='No data submitted'
8='Complete, final lock applied'
-2='Not applicable';
value prch_al
1='Parent record includes data from child campuses'
2='Child record - all data reported with parent campus'
-2='Not applicable';
value imp_al
1='Carry forward (CF)'
2='Nearest neighbor (NN)'
-2='Not applicable';
value hasal
1='Yes, have access to library collections and have library expenses'
2='Yes, have access to library collections, but no library expenses'
0='No access to library collections and no library expenses'
-2='Not applicable'
-1='Not reported';

Proc Freq;
Tables
stat_ic           lock_ic           stat_adm          lock_adm          imp_adm           imp_ic            ntrldstr          
prch_adm          stat_ef           lock_ef           prch_ef           imp_ef            pta99_ef          ptb_ef            
ptc_ef            ptd_ef            ptacipef          stat_e12          lock_e12          prch_e12          imp_e12           
stat_c            lock_c            prch_c            imp_c             sa_excl           stat_sa           stat_s            
ftemp15           form_f            stat_f            lock_f            prchtp_f          prch_f            imp_f             
fybeg             fyend             gpfs              f1gasbal          f2pell            f3pell            f_athrv1          
f_athrv2          f_athrv9          fcolathl          f_athex1          f_athex2          f_athex9          f_athrv           
f3bist            stat_sfa          lock_sfa          prch_sfa          imp_sfa           sfaform           stat_gr           
lock_gr           prch_gr           imp_gr            cohrtstu          stat_gr2          lock_gr2          prch_gr2          
imp_gr2           stat_om           lock_om           prch_om           imp_om            stat_eap          stat_hr           
imp_hr            lock_hr           prch_hr           tenursys          stat_al           lock_al           prch_al           
imp_al            hasal             / missing;
format
stat_ic stat_ic.
lock_ic lock_ic.
stat_adm stat_adm.
lock_adm lock_adm.
imp_adm imp_adm.
imp_ic imp_ic.
ntrldstr ntrldstr.
prch_adm prch_adm.
stat_ef stat_ef.
lock_ef lock_ef.
prch_ef prch_ef.
imp_ef imp_ef.
pta99_ef pta99_ef.
ptb_ef ptb_ef.
ptc_ef ptc_ef.
ptd_ef ptd_ef.
ptacipef ptacipef.
stat_e12 stat_e12f.
lock_e12 lock_e12f.
prch_e12 prch_e12f.
imp_e12 imp_e12f.
stat_c stat_c.
lock_c lock_c.
prch_c prch_c.
imp_c imp_c.
sa_excl sa_excl.
stat_sa stat_sa.
stat_s stat_s.
ftemp15 ftemp15f.
form_f form_f.
stat_f stat_f.
lock_f lock_f.
prchtp_f prchtp_f.
prch_f prch_f.
imp_f imp_f.
fybeg $fybeg.
fyend $fyend.
gpfs gpfs.
f1gasbal f1gasbal.
f2pell f2pell.
f3pell f3pell.
f_athrv1 f_athrv1f.
f_athrv2 f_athrv2f.
f_athrv9 f_athrv9f.
fcolathl fcolathl.
f_athex1 f_athex1f.
f_athex2 f_athex2f.
f_athex9 f_athex9f.
f_athrv f_athrv.
f3bist f3bist.
stat_sfa stat_sfa.
lock_sfa lock_sfa.
prch_sfa prch_sfa.
imp_sfa imp_sfa.
sfaform sfaform.
stat_gr stat_gr.
lock_gr lock_gr.
prch_gr prch_gr.
imp_gr imp_gr.
cohrtstu cohrtstu.
stat_gr2 stat_gr2f.
lock_gr2 lock_gr2f.
prch_gr2 prch_gr2f.
imp_gr2 imp_gr2f.
stat_om stat_om.
lock_om lock_om.
prch_om prch_om.
imp_om imp_om.
stat_eap stat_eap.
stat_hr stat_hr.
imp_hr imp_hr.
lock_hr lock_hr.
prch_hr prch_hr.
tenursys tenursys.
stat_al stat_al.
lock_al lock_al.
prch_al prch_al.
imp_al imp_al.
hasal hasal.
;

Proc Summary print n sum mean min max;
var
idx_adm           pcadm_f           idx_ef            pcef_f            idx_e12           pce12_f           idx_c             
pcc_f             idx_f             pcf_f             idx_sfa           pcsfa_f           idx_gr            pcgr_f            
idx_gr2           pcgr2_f           idx_om            pcom_f            idx_hr            pchr_f            idx_al            
pcal_f            ;
run;
