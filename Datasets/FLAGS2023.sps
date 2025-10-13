*** Created: 10-2025                                          
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
get data  /type = txt
/file = 'C:\dct\FLAGS2023.csv'
/delcase = LINE
/delimiters = ","
/qualifier =  '"'
/arrangement = delimited
/firstcase = 2
/importcase = all
/variables =
unitid            f6
stat_ic           f2
lock_ic           f2
imp_ic            f2
stat_c            f2
lock_c            f2
prch_c            f2
idx_c             f6
pcc_f             f2
imp_c             f2
stat_e12          f2
lock_e12          f2
prch_e12          f2
idx_e12           f6
pce12_f           f2
imp_e12           f2
stat_sfa          f2
lock_sfa          f2
prch_sfa          f2
idx_sfa           f6
pcsfa_f           f2
imp_sfa           f2
sfaform           f2
stat_gr           f2
lock_gr           f2
prch_gr           f2
idx_gr            f6
pcgr_f            f2
imp_gr            f2
cohrtstu          f2
stat_gr2          f2
lock_gr2          f2
prch_gr2          f2
idx_gr2           f6
pcgr2_f           f2
imp_gr2           f2
stat_om           f2
lock_om           f2
prch_om           f2
idx_om            f6
pcom_f            f2
imp_om            f2
stat_adm          f2
lock_adm          f2
prch_adm          f2
idx_adm           f6
pcadm_f           f2
imp_adm           f2
stat_hr           f2
lock_hr           f2
prch_hr           f2
idx_hr            f6
pchr_f            f2
imp_hr            f2
ftemp15           f2
tenursys          f2
sa_excl           f2
stat_eap          f2
stat_sa           f2
stat_s            f2
stat_ef           f2
lock_ef           f2
prch_ef           f2
idx_ef            f6
pcef_f            f2
imp_ef            f2
pta99_ef          f2
ptacipef          f2
ptb_ef            f2
ptc_ef            f2
ptd_ef            f2
stat_f            f2
lock_f            f2
prch_f            f2
idx_f             f6
pcf_f             f2
prchtp_f          f2
imp_f             f2
form_f            f2
fybeg             a6
fyend             a6
gpfs              f2
f1gasbal          f2
f2pell            f2
f3pell            f2
fcolathl          f2
f_athex1          f2
f_athex2          f2
f_athex9          f2
f_athrv           f2
f_athrv1          f2
f_athrv2          f2
f_athrv9          f2
f3bist            f2
stat_al           f2
lock_al           f2
prch_al           f2
idx_al            f6
pcal_f            f2
imp_al            f2
hasal             f2
ntrldstr          f2.

variable labels
unitid            ='Unique identification number of the institution'
stat_ic           ='Response status -  Institutional characteristics component'
lock_ic           ='Status of IC component when institution was migrated'
imp_ic            ='Type of imputation method Institutional Characteristics'
stat_c            ='Response status -  Completions component'
lock_c            ='Status of completions component when institution was migrated'
prch_c            ='Parent-child indicator for completions'
idx_c             ='UnitID of Parent institution'
pcc_f             ='Parent-child allocation factor - Completions'
imp_c             ='Type of imputation method Completions'
stat_e12          ='Response status of institution - 12-month enrollment'
lock_e12          ='Status of 12-month enrollment component whe data collection closed'
prch_e12          ='Parent-child indicator for 12-month enrollment'
idx_e12           ='ID number of parent institution - 12-month enrollment'
pce12_f           ='Parent-child allocation factor - 12-month enrollment'
imp_e12           ='Type of imputation method - 12 month enrollment'
stat_sfa          ='Response status for Student Financial Aid survey'
lock_sfa          ='Status of Student Financial Aid Survey when data collection closed'
prch_sfa          ='Parent-child indicator Student Financial Aid survey'
idx_sfa           ='ID number of parent institution Student Financial Aid'
pcsfa_f           ='Parent-child allocation factor - Student Financial Aid'
imp_sfa           ='Type of imputation method Student Financial Aid'
sfaform           ='SFA collection form type'
stat_gr           ='Response status - Graduation Rates'
lock_gr           ='Status of Graduation rate survey when data collection closed'
prch_gr           ='Parent-child indicator - Graduation Rates'
idx_gr            ='UNITID of parent institution reporting Graduation Rates'
pcgr_f            ='Parent-child allocation factor - Graduation Rates'
imp_gr            ='Imputation method - Graduation Rates'
cohrtstu          ='Enrolled any full-time first-time students'
stat_gr2          ='Response status - Graduation Rates 200'
lock_gr2          ='Status of Graduation rate 200 survey when data collection closed'
prch_gr2          ='Parent-child indicator - Graduation Rates 200'
idx_gr2           ='UNITID of parent institution reporting Graduation Rates 200'
pcgr2_f           ='Parent-child allocation factor - Graduation Rates 200'
imp_gr2           ='Imputation method - Graduation Rates 200'
stat_om           ='Response status - Outcome Measures'
lock_om           ='Status of Outcome Measures component when data collection closed'
prch_om           ='Parent-child indicator - Outcome Measures'
idx_om            ='UNITID of parent institution reporting Outcome Measures'
pcom_f            ='Parent-child allocation factor - Outcome Measures'
imp_om            ='Imputations method - Outcome Measures'
stat_adm          ='Response status - Admissions component'
lock_adm          ='Status of admissions component when institution was migrated'
prch_adm          ='Parent-child indicator for Admissions'
idx_adm           ='ID number of parent institution - Admissions'
pcadm_f           ='Parent-child allocation factor - Admissions'
imp_adm           ='Type of imputation method - Admissions component'
stat_hr           ='Response status of institution for Human Resources (HR) component'
lock_hr           ='Status of Human Resources (HR) component when data collection closed'
prch_hr           ='Parent-child  indicator - Human Resources (HR) component'
idx_hr            ='ID of institution where data are reported for the Human Resources (HR) component'
pchr_f            ='Parent-child allocation factor - HR'
imp_hr            ='Type of Imputation method - Human Resources (HR) component'
ftemp15           ='Does institution have 15 or more full-time employees'
tenursys          ='Does institution have a tenure system'
sa_excl           ='Salary exclusion'
stat_eap          ='Response status for EAP'
stat_sa           ='Response status to SA survey'
stat_s            ='Response status for Fall Staff'
stat_ef           ='Response status of institution -  Fall enrollment'
lock_ef           ='Status of Fall Enrollment survey when data collection closed'
prch_ef           ='Parent-child indicator f- Fall enrollment'
idx_ef            ='ID number of parent institution - Fall enrollment'
pcef_f            ='Parent-child allocation factor - Fall enrollment'
imp_ef            ='Type of imputation method - Fall enrollment'
pta99_ef          ='Status enrollment by race-ethnicity (99.0000 CIP)'
ptacipef          ='Status enrollment by major'
ptb_ef            ='Status enrollment summary by age'
ptc_ef            ='Status residence of first-time first-year students'
ptd_ef            ='Status total entering class and retention rates'
stat_f            ='Response status for Finance survey'
lock_f            ='Status of Finance survey when data collection closed'
prch_f            ='Parent-child indicator - Finance'
idx_f             ='ID number of parent institution - Finance'
pcf_f             ='Parent-child allocation factor - Finance'
prchtp_f          ='Parent-child system indicator - Finance'
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
prch_al           ='Parent-child indicator for Academic Libraries'
idx_al            ='UnitID of Parent institution - Academic Libraries'
pcal_f            ='Parent-child allocation factor - Academic Libraries'
imp_al            ='Type of imputation method - Academic Libraries'
hasal             ='Has an academic library'
ntrldstr          ='Natural Disaster identification'.

value labels
/stat_ic
1                 'Respondent'
2                 'Partial respondent, imputed'
3                 'Partial respondent, not imputed'
5                 'Nonrespondent, not imputed'
-9                'Not active'
/lock_ic
0                 'No data'
8                 'Complete, final lock applied'
-2                'Not applicable'
/stat_adm
1                 'Respondent'
2                 'Partial respondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_adm
8                 'Complete, final lock applied'
0                 'No data submitted'
-2                'Not applicable'
/imp_adm
1                 'Carry forward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/imp_ic
1                 'Carry forward (CF)'
-2                'Not applicable'
/ntrldstr
0                 'No'
/prch_adm
-2                'Not applicable'
/stat_ef
1                 'Respondent'
2                 'Partial respondent imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_ef
0                 'No data submitted'
8                 'Complete, final lock applied'
-2                'Not applicable'
/prch_ef
1                 'Parent record includes data from child campuses'
2                 'Child record - data reported with parent campus'
-2                'Not applicable'
/imp_ef
1                 'Carry foreward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/pta99_ef
1                 'Respondent'
4                 'Nonrespondent imputed'
5                 'Nonrespondent not imputed'
-2                'Not applicable'
-9                '{Not active}'
/ptb_ef
1                 'Respondent'
4                 'Nonrespondent imputed'
5                 'Nonrespondent not imputed'
-2                'Not applicable'
-9                'Not active'
/ptc_ef
1                 'Respondent'
5                 'Nonrespondent not imputed'
-2                'Not applicable'
-9                'Not active'
/ptd_ef
1                 'Respondent'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/ptacipef
-2                'Not applicable'
-9                'Not active'
/stat_e12
1                 'Respondent'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_e12
0                 'No data submitted'
8                 'Complete, final lock applied'
-2                'Not applicable'
/prch_e12
1                 'Parent record includes data from child campuses'
2                 'Child record - data reported with parent campus'
-2                'Not applicable'
/imp_e12
-2                'Not applicable'
/stat_c
1                 'Respondent'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_c
0                 'No data submitted'
8                 'Complete, final lock applied'
-2                'Not applicable'
/prch_c
1                 'Parent record includes data from child campuses'
2                 'Child record - all data reported with parent campus'
-2                'Not applicable'
/imp_c
-2                'Not applicable'
/sa_excl
1                 'Yes'
2                 'No'
-2                'Not applicable'
-1                'Not reported'
/stat_sa
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/stat_s
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/ftemp15
1                 'Yes'
2                 'No'
-1                'Not reported'
-2                'Not applicable'
/form_f
4                 'GASB Reporting Standards 34-35'
2                 'FASB Reporting Standards'
3                 'Private for-profit institutions'
-1                'Not reported'
-2                'Not applicable'
/stat_f
1                 'Respondent'
2                 'Partial respondent imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_f
8                 'Complete, final lock applied'
0                 'No data submitted'
3                 'Edited, some errors-warnings remain'
-2                'Not applicable'
/prchtp_f
1                 'Full parent-child system'
2                 'Partial parent child system (1)'
3                 'Partial parent child system (2)'
5                 'System with partial reporting children campuses of NON-IPEDS entity'
-2                'Not applicable'
/prch_f
1                 'Parent record - includes data from branch campuses'
2                 'Child record - data reported with parent campus'
3                 'Partial child record - reports revenues-expenses. Assets-liabilties reported with parent'
6                 'Partial parent-child record - reports revenues-expenses that also includes data from other branch campuses. Assets-liabilties reported with parent'
5                 'Child record - reports partial data but other data is included  with entity that is not a postsecondary institution'
-2                'Not applicable'
/imp_f
1                 'Carry foreward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/fybeg
'012022'          'January 2022'
'022022'          'February 2022'
'032022'          'March 2022'
'042022'          'April 2022'
'052022'          'May 2022'
'062022'          'June 2022'
'072022'          'July 2022'
'082022'          'August 2022'
'092022'          'September 2022'
'102022'          'October 2022'
'112021'          'November 2021'
'122021'          'December 2021'
'-1'              'Not reported'
'-2'              'Not applicable'
/fyend
'102022'          'October 2022'
'112022'          'November 2022'
'122022'          'December 2022'
'012023'          'January 2023'
'022023'          'February 2023'
'032023'          'March 2023'
'042023'          'April 2023'
'052023'          'May 2023'
'062023'          'June 2023'
'072023'          'July 2023'
'082023'          'August 2023'
'092023'          'September 2023'
'-1'              'Not reported'
'-2'              'Not applicable'
/gpfs
1                 'Yes (unqualified)'
2                 'No (qualified)'
3                 'Do not know'
-1                'Not reported'
-2                'Not applicable'
/f1gasbal
1                 'Business Type Activities'
2                 'Governmental Activities'
3                 'Governmental Activities with Business-Type Activities'
-1                'Not reported'
-2                'Not applicable'
/f2pell
1                 'Pass through (agency)'
2                 'Federal grants'
3                 'Does not award Pell grants'
-1                'Not reported'
-2                'Not applicable'
/f3pell
1                 'Pass through (agency)'
3                 'Does not award Pell grants'
-1                'Not reported'
-2                'Not applicable'
/f_athrv1
1                 'Yes, included with sales and services of educational activities'
0                 'Not included with sales and services of educational activities'
-1                'Not reported'
-2                'Not applicable'
/f_athrv2
1                 'Yes, included with sales and services of auxiliary enterprises'
0                 'Not included with sales and services of auxiliary enterprises'
-1                'Not reported'
-2                'Not applicable'
/f_athrv9
1                 'Yes, included with sources other than sales and services'
0                 'Not included with sources other than sales and services'
-1                'Not reported'
-2                'Not applicable'
/fcolathl
1                 'Yes'
2                 'No'
-1                'Not reported'
-2                'Not applicable'
/f_athex1
1                 'Yes, accounted for as auxiliary enterprises'
0                 'Not accounted for as auxlliary enterprises'
-1                'Not reported'
-2                'Not applicable'
/f_athex2
1                 'Yes, accounted for as student services'
0                 'Not accounted for as student services'
-1                'Not reported'
-2                'Not applicable'
/f_athex9
1                 'Yes, accounted for as other expense functional category'
0                 'Not accounted for as other expense functional category'
-1                'Not reported'
-2                'Not applicable'
/f_athrv
1                 'Has athletic revenues'
2                 'Does not have athletic revenues'
-1                'Not reported'
-2                'Not applicable'
/f3bist
1                 'Sole Proprietorship'
2                 'Partnership (General, Limited, Limited Liability)'
3                 'C Corporation'
4                 'S Corporation'
5                 'Limited Liability Company (LLC)'
-1                'Not reported'
-2                'Not applicable'
/stat_sfa
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_sfa
8                 'Complete, final lock applied'
0                 'No data submitted'
3                 'Edited, some errors-warnings remain'
-2                'Not applicable'
/prch_sfa
1                 'Parent record - includes data from branch campuses'
2                 'Child record - data reported with parent campus'
-2                'Not applicable'
/imp_sfa
1                 'Carry forward (CF)'
-2                'Not applicable'
/sfaform
1                 'Undergraduate student financial and undergraduate military servicemembers-veteran^s benefits are applicable'
2                 'Undergraduate student financial and undergraduate and graduate military servicemembers-veteran^s benefits are applicable'
3                 'Graduate military servicemembers-veteran^s benefits screens are applicable'
-2                'Not applicable'
/stat_gr
1                 'Respondent'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_gr
0                 'No data submitted'
8                 'Complete'
-2                'Not applicable'
/prch_gr
-2                'Not applicable'
/imp_gr
1                 'Carry foreward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/cohrtstu
1                 'Yes'
2                 'No, did not enroll full-time, first-time (undergraduate) students'
3                 'No, did not offer programs at or below the baccalaureate level'
4                 'No, institution was not in operation in cohort year'
-1                'Not reported'
-2                'Not applicable'
/stat_gr2
1                 'Respondent'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_gr2
0                 'No data submitted'
8                 'Complete'
-2                'Not applicable'
/prch_gr2
-2                'Not applicable'
/imp_gr2
1                 'Carry foreward (CF)'
-2                'Not applicable'
/stat_om
1                 'Respondent'
2                 'Partial respondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_om
0                 'No data submitted'
8                 'Complete'
-2                'Not applicable'
/prch_om
-2                'Not applicable'
/imp_om
1                 'Carry foreward (CF)'
-2                'Not applicable'
/stat_eap
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/stat_hr
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/imp_hr
1                 'Carry foreward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/lock_hr
0                 'No data submitted'
8                 'Complete, final lock applied'
-2                'Not applicable'
/prch_hr
1                 'Parent record includes data from child campuses'
2                 'Child record - all data reported with parent campus'
-2                'Not applicable'
/tenursys
1                 'Has tenure system'
2                 'No tenure system'
-1                'Not reported'
-2                'Not applicable'
/stat_al
1                 'Respondent'
2                 'Partial respondent, imputed'
4                 'Nonrespondent, imputed'
5                 'Nonrespondent, not imputed'
-2                'Not applicable'
-9                'Not active'
/lock_al
0                 'No data submitted'
8                 'Complete, final lock applied'
-2                'Not applicable'
/prch_al
1                 'Parent record includes data from child campuses'
2                 'Child record - all data reported with parent campus'
-2                'Not applicable'
/imp_al
1                 'Carry forward (CF)'
2                 'Nearest neighbor (NN)'
-2                'Not applicable'
/hasal
1                 'Yes, have access to library collections and have library expenses'
2                 'Yes, have access to library collections, but no library expenses'
0                 'No access to library collections and no library expenses'
-2                'Not applicable'
-1                'Not reported'.

frequencies variables=
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
imp_al            hasal             .

descriptives variables=
idx_adm           pcadm_f           idx_ef            pcef_f            idx_e12           pce12_f           idx_c             
pcc_f             idx_f             pcf_f             idx_sfa           pcsfa_f           idx_gr            pcgr_f            
idx_gr2           pcgr2_f           idx_om            pcom_f            idx_hr            pchr_f            idx_al            
pcal_f            
/stats=def.

save outfile='FLAGS2023.sav' /compressed.
