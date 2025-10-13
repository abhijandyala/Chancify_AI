*** Created: 10-2025                                         
*
* Modify the path below to point to your data file.
* The specified subdirectory was not created on
* your computer. You will need to do this.
*
* The stat program must be run against the specified
* data file. This file is specified in the program
* and must be saved separately.
*
* This program does not provide tab or summarize for all
* variables.
*
* There may be missing data for some institutions due
* to the merge used to create this file.
*
* This program does not include reserved values in its
* calculations for missing values.
*
* You may need to adjust your memory settings depending
* upon the number of variables and records.
*
* The save command may need to be modified per user
* requirements.
*
* For long lists of value labels, the titles may be
* shortened per program requirements.
*

insheet using "e:\shares\ipeds\dct\FLAGS2023_data_stata.csv", comma clear
label data "dct_FLAGS2023"
label variable unitid             "Unique identification number of the institution"
label variable stat_ic            "Response status -  Institutional characteristics component"
label variable lock_ic            "Status of IC component when institution was migrated"
label variable imp_ic             "Type of imputation method Institutional Characteristics"
label variable stat_c             "Response status -  Completions component"
label variable lock_c             "Status of completions component when institution was migrated"
label variable prch_c             "Parent/child indicator for completions"
label variable idx_c              "UnitID of Parent institution"
label variable pcc_f              "Parent/child allocation factor - Completions"
label variable imp_c              "Type of imputation method Completions"
label variable stat_e12           "Response status of institution - 12-month enrollment"
label variable lock_e12           "Status of 12-month enrollment component whe data collection closed"
label variable prch_e12           "Parent/child indicator for 12-month enrollment"
label variable idx_e12            "ID number of parent institution - 12-month enrollment"
label variable pce12_f            "Parent/child allocation factor - 12-month enrollment"
label variable imp_e12            "Type of imputation method - 12 month enrollment"
label variable stat_sfa           "Response status for Student Financial Aid survey"
label variable lock_sfa           "Status of Student Financial Aid Survey when data collection closed"
label variable prch_sfa           "Parent/child indicator Student Financial Aid survey"
label variable idx_sfa            "ID number of parent institution Student Financial Aid"
label variable pcsfa_f            "Parent/child allocation factor - Student Financial Aid"
label variable imp_sfa            "Type of imputation method Student Financial Aid"
label variable sfaform            "SFA collection form type"
label variable stat_gr            "Response status - Graduation Rates"
label variable lock_gr            "Status of Graduation rate survey when data collection closed"
label variable prch_gr            "Parent/child indicator - Graduation Rates"
label variable idx_gr             "UNITID of parent institution reporting Graduation Rates"
label variable pcgr_f             "Parent/child allocation factor - Graduation Rates"
label variable imp_gr             "Imputation method - Graduation Rates"
label variable cohrtstu           "Enrolled any full-time first-time students"
label variable stat_gr2           "Response status - Graduation Rates 200"
label variable lock_gr2           "Status of Graduation rate 200 survey when data collection closed"
label variable prch_gr2           "Parent/child indicator - Graduation Rates 200"
label variable idx_gr2            "UNITID of parent institution reporting Graduation Rates 200"
label variable pcgr2_f            "Parent/child allocation factor - Graduation Rates 200"
label variable imp_gr2            "Imputation method - Graduation Rates 200"
label variable stat_om            "Response status - Outcome Measures"
label variable lock_om            "Status of Outcome Measures component when data collection closed"
label variable prch_om            "Parent/child indicator - Outcome Measures"
label variable idx_om             "UNITID of parent institution reporting Outcome Measures"
label variable pcom_f             "Parent/child allocation factor - Outcome Measures"
label variable imp_om             "Imputations method - Outcome Measures"
label variable stat_adm           "Response status - Admissions component"
label variable lock_adm           "Status of admissions component when institution was migrated"
label variable prch_adm           "Parent/child indicator for Admissions"
label variable idx_adm            "ID number of parent institution - Admissions"
label variable pcadm_f            "Parent/child allocation factor - Admissions"
label variable imp_adm            "Type of imputation method - Admissions component"
label variable stat_hr            "Response status of institution for Human Resources (HR) component"
label variable lock_hr            "Status of Human Resources (HR) component when data collection closed"
label variable prch_hr            "Parent/child  indicator - Human Resources (HR) component"
label variable idx_hr             "ID of institution where data are reported for the Human Resources (HR) component"
label variable pchr_f             "Parent/child allocation factor - HR"
label variable imp_hr             "Type of Imputation method - Human Resources (HR) component"
label variable ftemp15            "Does institution have 15 or more full-time employees"
label variable tenursys           "Does institution have a tenure system"
label variable sa_excl            "Salary exclusion"
label variable stat_eap           "Response status for EAP"
label variable stat_sa            "Response status to SA survey"
label variable stat_s             "Response status for Fall Staff"
label variable stat_ef            "Response status of institution -  Fall enrollment"
label variable lock_ef            "Status of Fall Enrollment survey when data collection closed"
label variable prch_ef            "Parent/child indicator f- Fall enrollment"
label variable idx_ef             "ID number of parent institution - Fall enrollment"
label variable pcef_f             "Parent/child allocation factor - Fall enrollment"
label variable imp_ef             "Type of imputation method - Fall enrollment"
label variable pta99_ef           "Status enrollment by race/ethnicity (99.0000 CIP)"
label variable ptacipef           "Status enrollment by major"
label variable ptb_ef             "Status enrollment summary by age"
label variable ptc_ef             "Status residence of first-time first-year students"
label variable ptd_ef             "Status total entering class and retention rates"
label variable stat_f             "Response status for Finance survey"
label variable lock_f             "Status of Finance survey when data collection closed"
label variable prch_f             "Parent/child indicator - Finance"
label variable idx_f              "ID number of parent institution - Finance"
label variable pcf_f              "Parent/child allocation factor - Finance"
label variable prchtp_f           "Parent/child system indicator - Finance"
label variable imp_f              "Type of imputation method  Finance"
label variable form_f             "Identifies reporting standards GASB, FASB, or modified FASB(for-profit institutions) used to report finance data"
label variable fybeg              "Beginning date of fiscal year covered (all finance)"
label variable fyend              "End date of fiscal year covered  (all finance)"
label variable gpfs               "Audit Opinion GPFS from auditor (all finance)"
label variable f1gasbal           "GASB alternative accounting model"
label variable f2pell             "Account for Pell grants as pass through transactions or as federal grant revenues to the institution (FASB  institutions)?"
label variable f3pell             "Account for Pell grants as pass through transactions or as federal grant revenues to the institution (private-for-profit institutions)?"
label variable fcolathl           "Participates in intercollegiate athletics"
label variable f_athex1           "Intercollegiate athletic expenses accounted for as auxiliary enterprises"
label variable f_athex2           "Intercollegiate athletic expenses accounted for as student services"
label variable f_athex9           "Intercollegiate athletic expenses accounted for as other expense functional classification"
label variable f_athrv            "Intercollegiate athletic revenues"
label variable f_athrv1           "Are intercollegiate athletic revenues included with sales and services of educational activities"
label variable f_athrv2           "Are intercollegiate athletic revenues included with sales and services of auxiliary enterprises"
label variable f_athrv9           "Are intercollegiate athletic revenues included with a source other than educational activities or auxiliary enterprises"
label variable f3bist             "Type of business structure for tax purposes (private-for-profit, degree-granting institutions)"
label variable stat_al            "Response status -  Academic Libraries component"
label variable lock_al            "Status of Academic Library component when institution was migrated"
label variable prch_al            "Parent/child indicator for Academic Libraries"
label variable idx_al             "UnitID of Parent institution - Academic Libraries"
label variable pcal_f             "Parent/child allocation factor - Academic Libraries"
label variable imp_al             "Type of imputation method - Academic Libraries"
label variable hasal              "Has an academic library"
label variable ntrldstr           "Natural Disaster identification"
label define label_stat_ic 1 "Respondent"
label define label_stat_ic 2 "Partial respondent, imputed", add
label define label_stat_ic 3 "Partial respondent, not imputed", add
label define label_stat_ic 5 "Nonrespondent, not imputed", add
label define label_stat_ic -9 "Not active", add
label values stat_ic label_stat_ic
label define label_lock_ic 0 "No data"
label define label_lock_ic 8 "Complete, final lock applied", add
label define label_lock_ic -2 "Not applicable", add
label values lock_ic label_lock_ic
label define label_stat_adm 1 "Respondent"
label define label_stat_adm 2 "Partial respondent, imputed", add
label define label_stat_adm 5 "Nonrespondent, not imputed", add
label define label_stat_adm -2 "Not applicable", add
label define label_stat_adm -9 "Not active", add
label values stat_adm label_stat_adm
label define label_lock_adm 8 "Complete, final lock applied"
label define label_lock_adm 0 "No data submitted", add
label define label_lock_adm -2 "Not applicable", add
label values lock_adm label_lock_adm
label define label_imp_adm 1 "Carry forward (CF)"
label define label_imp_adm 2 "Nearest neighbor (NN)", add
label define label_imp_adm -2 "Not applicable", add
label values imp_adm label_imp_adm
label define label_imp_ic 1 "Carry forward (CF)"
label define label_imp_ic -2 "Not applicable", add
label values imp_ic label_imp_ic
label define label_ntrldstr 0 "No"
label values ntrldstr label_ntrldstr
label define label_prch_adm -2 "Not applicable"
label values prch_adm label_prch_adm
label define label_stat_ef 1 "Respondent"
label define label_stat_ef 2 "Partial respondent imputed", add
label define label_stat_ef 4 "Nonrespondent, imputed", add
label define label_stat_ef 5 "Nonrespondent, not imputed", add
label define label_stat_ef -2 "Not applicable", add
label define label_stat_ef -9 "Not active", add
label values stat_ef label_stat_ef
label define label_lock_ef 0 "No data submitted"
label define label_lock_ef 8 "Complete, final lock applied", add
label define label_lock_ef -2 "Not applicable", add
label values lock_ef label_lock_ef
label define label_prch_ef 1 "Parent record includes data from child campuses"
label define label_prch_ef 2 "Child record - data reported with parent campus", add
label define label_prch_ef -2 "Not applicable", add
label values prch_ef label_prch_ef
label define label_imp_ef 1 "Carry foreward (CF)"
label define label_imp_ef 2 "Nearest neighbor (NN)", add
label define label_imp_ef -2 "Not applicable", add
label values imp_ef label_imp_ef
label define label_pta99_ef 1 "Respondent"
label define label_pta99_ef 4 "Nonrespondent imputed", add
label define label_pta99_ef 5 "Nonrespondent not imputed", add
label define label_pta99_ef -2 "Not applicable", add
label define label_pta99_ef -9 "{Not active}", add
label values pta99_ef label_pta99_ef
label define label_ptb_ef 1 "Respondent"
label define label_ptb_ef 4 "Nonrespondent imputed", add
label define label_ptb_ef 5 "Nonrespondent not imputed", add
label define label_ptb_ef -2 "Not applicable", add
label define label_ptb_ef -9 "Not active", add
label values ptb_ef label_ptb_ef
label define label_ptc_ef 1 "Respondent"
label define label_ptc_ef 5 "Nonrespondent not imputed", add
label define label_ptc_ef -2 "Not applicable", add
label define label_ptc_ef -9 "Not active", add
label values ptc_ef label_ptc_ef
label define label_ptd_ef 1 "Respondent"
label define label_ptd_ef 4 "Nonrespondent, imputed", add
label define label_ptd_ef 5 "Nonrespondent, not imputed", add
label define label_ptd_ef -2 "Not applicable", add
label define label_ptd_ef -9 "Not active", add
label values ptd_ef label_ptd_ef
label define label_ptacipef -2 "Not applicable"
label define label_ptacipef -9 "Not active", add
label values ptacipef label_ptacipef
label define label_stat_e12 1 "Respondent"
label define label_stat_e12 5 "Nonrespondent, not imputed", add
label define label_stat_e12 -2 "Not applicable", add
label define label_stat_e12 -9 "Not active", add
label values stat_e12 label_stat_e12
label define label_lock_e12 0 "No data submitted"
label define label_lock_e12 8 "Complete, final lock applied", add
label define label_lock_e12 -2 "Not applicable", add
label values lock_e12 label_lock_e12
label define label_prch_e12 1 "Parent record includes data from child campuses"
label define label_prch_e12 2 "Child record - data reported with parent campus", add
label define label_prch_e12 -2 "Not applicable", add
label values prch_e12 label_prch_e12
label define label_imp_e12 -2 "Not applicable"
label values imp_e12 label_imp_e12
label define label_stat_c 1 "Respondent"
label define label_stat_c 5 "Nonrespondent, not imputed", add
label define label_stat_c -2 "Not applicable", add
label define label_stat_c -9 "Not active", add
label values stat_c label_stat_c
label define label_lock_c 0 "No data submitted"
label define label_lock_c 8 "Complete, final lock applied", add
label define label_lock_c -2 "Not applicable", add
label values lock_c label_lock_c
label define label_prch_c 1 "Parent record includes data from child campuses"
label define label_prch_c 2 "Child record - all data reported with parent campus", add
label define label_prch_c -2 "Not applicable", add
label values prch_c label_prch_c
label define label_imp_c -2 "Not applicable"
label values imp_c label_imp_c
label define label_sa_excl 1 "Yes"
label define label_sa_excl 2 "No", add
label define label_sa_excl -2 "Not applicable", add
label define label_sa_excl -1 "Not reported", add
label values sa_excl label_sa_excl
label define label_stat_sa 1 "Respondent"
label define label_stat_sa 2 "Partial respondent, imputed", add
label define label_stat_sa 4 "Nonrespondent, imputed", add
label define label_stat_sa 5 "Nonrespondent, not imputed", add
label define label_stat_sa -2 "Not applicable", add
label define label_stat_sa -9 "Not active", add
label values stat_sa label_stat_sa
label define label_stat_s 1 "Respondent"
label define label_stat_s 2 "Partial respondent, imputed", add
label define label_stat_s 4 "Nonrespondent, imputed", add
label define label_stat_s 5 "Nonrespondent, not imputed", add
label define label_stat_s -2 "Not applicable", add
label define label_stat_s -9 "Not active", add
label values stat_s label_stat_s
label define label_ftemp15 1 "Yes"
label define label_ftemp15 2 "No", add
label define label_ftemp15 -1 "Not reported", add
label define label_ftemp15 -2 "Not applicable", add
label values ftemp15 label_ftemp15
label define label_form_f 4 "GASB Reporting Standards 34/35"
label define label_form_f 2 "FASB Reporting Standards", add
label define label_form_f 3 "Private for-profit institutions", add
label define label_form_f -1 "Not reported", add
label define label_form_f -2 "Not applicable", add
label values form_f label_form_f
label define label_stat_f 1 "Respondent"
label define label_stat_f 2 "Partial respondent imputed", add
label define label_stat_f 4 "Nonrespondent, imputed", add
label define label_stat_f 5 "Nonrespondent, not imputed", add
label define label_stat_f -2 "Not applicable", add
label define label_stat_f -9 "Not active", add
label values stat_f label_stat_f
label define label_lock_f 8 "Complete, final lock applied"
label define label_lock_f 0 "No data submitted", add
label define label_lock_f 3 "Edited, some errors/warnings remain", add
label define label_lock_f -2 "Not applicable", add
label values lock_f label_lock_f
label define label_prchtp_f 1 "Full parent/child system"
label define label_prchtp_f 2 "Partial parent child system (1)", add
label define label_prchtp_f 3 "Partial parent child system (2)", add
label define label_prchtp_f 5 "System with partial reporting children campuses of NON-IPEDS entity", add
label define label_prchtp_f -2 "Not applicable", add
label values prchtp_f label_prchtp_f
label define label_prch_f 1 "Parent record - includes data from branch campuses"
label define label_prch_f 2 "Child record - data reported with parent campus", add
label define label_prch_f 3 "Partial child record - reports revenues/expenses. Assets/liabilties reported with parent", add
label define label_prch_f 6 "Partial parent/child record - reports revenues/expenses that also includes data from other branch campuses. Assets/liabilties reported with parent", add
label define label_prch_f 5 "Child record - reports partial data but other data is included  with entity that is not a postsecondary institution", add
label define label_prch_f -2 "Not applicable", add
label values prch_f label_prch_f
label define label_imp_f 1 "Carry foreward (CF)"
label define label_imp_f 2 "Nearest neighbor (NN)", add
label define label_imp_f -2 "Not applicable", add
label values imp_f label_imp_f
label define label_fybeg 12022 "012022-January 2022"
label define label_fybeg 22022 "022022-February 2022", add
label define label_fybeg 32022 "032022-March 2022", add
label define label_fybeg 42022 "042022-April 2022", add
label define label_fybeg 52022 "052022-May 2022", add
label define label_fybeg 62022 "062022-June 2022", add
label define label_fybeg 72022 "072022-July 2022", add
label define label_fybeg 82022 "082022-August 2022", add
label define label_fybeg 92022 "092022-September 2022", add
label define label_fybeg 102022 "October 2022", add
label define label_fybeg 112021 "November 2021", add
label define label_fybeg 122021 "December 2021", add
label define label_fybeg -1 "Not reported", add
label define label_fybeg -2 "Not applicable", add
label values fybeg label_fybeg
label define label_fyend 102022 "October 2022"
label define label_fyend 112022 "November 2022", add
label define label_fyend 122022 "December 2022", add
label define label_fyend 12023 "012023-January 2023", add
label define label_fyend 22023 "022023-February 2023", add
label define label_fyend 32023 "032023-March 2023", add
label define label_fyend 42023 "042023-April 2023", add
label define label_fyend 52023 "052023-May 2023", add
label define label_fyend 62023 "062023-June 2023", add
label define label_fyend 72023 "072023-July 2023", add
label define label_fyend 82023 "082023-August 2023", add
label define label_fyend 92023 "092023-September 2023", add
label define label_fyend -1 "Not reported", add
label define label_fyend -2 "Not applicable", add
label values fyend label_fyend
label define label_gpfs 1 "Yes (unqualified)"
label define label_gpfs 2 "No (qualified)", add
label define label_gpfs 3 "Do not know", add
label define label_gpfs -1 "Not reported", add
label define label_gpfs -2 "Not applicable", add
label values gpfs label_gpfs
label define label_f1gasbal 1 "Business Type Activities"
label define label_f1gasbal 2 "Governmental Activities", add
label define label_f1gasbal 3 "Governmental Activities with Business-Type Activities", add
label define label_f1gasbal -1 "Not reported", add
label define label_f1gasbal -2 "Not applicable", add
label values f1gasbal label_f1gasbal
label define label_f2pell 1 "Pass through (agency)"
label define label_f2pell 2 "Federal grants", add
label define label_f2pell 3 "Does not award Pell grants", add
label define label_f2pell -1 "Not reported", add
label define label_f2pell -2 "Not applicable", add
label values f2pell label_f2pell
label define label_f3pell 1 "Pass through (agency)"
label define label_f3pell 3 "Does not award Pell grants", add
label define label_f3pell -1 "Not reported", add
label define label_f3pell -2 "Not applicable", add
label values f3pell label_f3pell
label define label_f_athrv1 1 "Yes, included with sales and services of educational activities"
label define label_f_athrv1 0 "Not included with sales and services of educational activities", add
label define label_f_athrv1 -1 "Not reported", add
label define label_f_athrv1 -2 "Not applicable", add
label values f_athrv1 label_f_athrv1
label define label_f_athrv2 1 "Yes, included with sales and services of auxiliary enterprises"
label define label_f_athrv2 0 "Not included with sales and services of auxiliary enterprises", add
label define label_f_athrv2 -1 "Not reported", add
label define label_f_athrv2 -2 "Not applicable", add
label values f_athrv2 label_f_athrv2
label define label_f_athrv9 1 "Yes, included with sources other than sales and services"
label define label_f_athrv9 0 "Not included with sources other than sales and services", add
label define label_f_athrv9 -1 "Not reported", add
label define label_f_athrv9 -2 "Not applicable", add
label values f_athrv9 label_f_athrv9
label define label_fcolathl 1 "Yes"
label define label_fcolathl 2 "No", add
label define label_fcolathl -1 "Not reported", add
label define label_fcolathl -2 "Not applicable", add
label values fcolathl label_fcolathl
label define label_f_athex1 1 "Yes, accounted for as auxiliary enterprises"
label define label_f_athex1 0 "Not accounted for as auxlliary enterprises", add
label define label_f_athex1 -1 "Not reported", add
label define label_f_athex1 -2 "Not applicable", add
label values f_athex1 label_f_athex1
label define label_f_athex2 1 "Yes, accounted for as student services"
label define label_f_athex2 0 "Not accounted for as student services", add
label define label_f_athex2 -1 "Not reported", add
label define label_f_athex2 -2 "Not applicable", add
label values f_athex2 label_f_athex2
label define label_f_athex9 1 "Yes, accounted for as other expense functional category"
label define label_f_athex9 0 "Not accounted for as other expense functional category", add
label define label_f_athex9 -1 "Not reported", add
label define label_f_athex9 -2 "Not applicable", add
label values f_athex9 label_f_athex9
label define label_f_athrv 1 "Has athletic revenues"
label define label_f_athrv 2 "Does not have athletic revenues", add
label define label_f_athrv -1 "Not reported", add
label define label_f_athrv -2 "Not applicable", add
label values f_athrv label_f_athrv
label define label_f3bist 1 "Sole Proprietorship"
label define label_f3bist 2 "Partnership (General, Limited, Limited Liability)", add
label define label_f3bist 3 "C Corporation", add
label define label_f3bist 4 "S Corporation", add
label define label_f3bist 5 "Limited Liability Company (LLC)", add
label define label_f3bist -1 "Not reported", add
label define label_f3bist -2 "Not applicable", add
label values f3bist label_f3bist
label define label_stat_sfa 1 "Respondent"
label define label_stat_sfa 2 "Partial respondent, imputed", add
label define label_stat_sfa 4 "Nonrespondent, imputed", add
label define label_stat_sfa 5 "Nonrespondent, not imputed", add
label define label_stat_sfa -2 "Not applicable", add
label define label_stat_sfa -9 "Not active", add
label values stat_sfa label_stat_sfa
label define label_lock_sfa 8 "Complete, final lock applied"
label define label_lock_sfa 0 "No data submitted", add
label define label_lock_sfa 3 "Edited, some errors/warnings remain", add
label define label_lock_sfa -2 "Not applicable", add
label values lock_sfa label_lock_sfa
label define label_prch_sfa 1 "Parent record - includes data from branch campuses"
label define label_prch_sfa 2 "Child record - data reported with parent campus", add
label define label_prch_sfa -2 "Not applicable", add
label values prch_sfa label_prch_sfa
label define label_imp_sfa 1 "Carry forward (CF)"
label define label_imp_sfa -2 "Not applicable", add
label values imp_sfa label_imp_sfa
label define label_sfaform 1 "Undergraduate student financial and undergraduate military servicemembers/veteran^s benefits are applicable"
label define label_sfaform 2 "Undergraduate student financial and undergraduate and graduate military servicemembers/veteran^s benefits are applicable", add
label define label_sfaform 3 "Graduate military servicemembers/veteran^s benefits screens are applicable", add
label define label_sfaform -2 "Not applicable", add
label values sfaform label_sfaform
label define label_stat_gr 1 "Respondent"
label define label_stat_gr 4 "Nonrespondent, imputed", add
label define label_stat_gr 5 "Nonrespondent, not imputed", add
label define label_stat_gr -2 "Not applicable", add
label define label_stat_gr -9 "Not active", add
label values stat_gr label_stat_gr
label define label_lock_gr 0 "No data submitted"
label define label_lock_gr 8 "Complete", add
label define label_lock_gr -2 "Not applicable", add
label values lock_gr label_lock_gr
label define label_prch_gr -2 "Not applicable"
label values prch_gr label_prch_gr
label define label_imp_gr 1 "Carry foreward (CF)"
label define label_imp_gr 2 "Nearest neighbor (NN)", add
label define label_imp_gr -2 "Not applicable", add
label values imp_gr label_imp_gr
label define label_cohrtstu 1 "Yes"
label define label_cohrtstu 2 "No, did not enroll full-time, first-time (undergraduate) students", add
label define label_cohrtstu 3 "No, did not offer programs at or below the baccalaureate level", add
label define label_cohrtstu 4 "No, institution was not in operation in cohort year", add
label define label_cohrtstu -1 "Not reported", add
label define label_cohrtstu -2 "Not applicable", add
label values cohrtstu label_cohrtstu
label define label_stat_gr2 1 "Respondent"
label define label_stat_gr2 4 "Nonrespondent, imputed", add
label define label_stat_gr2 5 "Nonrespondent, not imputed", add
label define label_stat_gr2 -2 "Not applicable", add
label define label_stat_gr2 -9 "Not active", add
label values stat_gr2 label_stat_gr2
label define label_lock_gr2 0 "No data submitted"
label define label_lock_gr2 8 "Complete", add
label define label_lock_gr2 -2 "Not applicable", add
label values lock_gr2 label_lock_gr2
label define label_prch_gr2 -2 "Not applicable"
label values prch_gr2 label_prch_gr2
label define label_imp_gr2 1 "Carry foreward (CF)"
label define label_imp_gr2 -2 "Not applicable", add
label values imp_gr2 label_imp_gr2
label define label_stat_om 1 "Respondent"
label define label_stat_om 2 "Partial respondent, imputed", add
label define label_stat_om 5 "Nonrespondent, not imputed", add
label define label_stat_om -2 "Not applicable", add
label define label_stat_om -9 "Not active", add
label values stat_om label_stat_om
label define label_lock_om 0 "No data submitted"
label define label_lock_om 8 "Complete", add
label define label_lock_om -2 "Not applicable", add
label values lock_om label_lock_om
label define label_prch_om -2 "Not applicable"
label values prch_om label_prch_om
label define label_imp_om 1 "Carry foreward (CF)"
label define label_imp_om -2 "Not applicable", add
label values imp_om label_imp_om
label define label_stat_eap 1 "Respondent"
label define label_stat_eap 2 "Partial respondent, imputed", add
label define label_stat_eap 4 "Nonrespondent, imputed", add
label define label_stat_eap 5 "Nonrespondent, not imputed", add
label define label_stat_eap -2 "Not applicable", add
label define label_stat_eap -9 "Not active", add
label values stat_eap label_stat_eap
label define label_stat_hr 1 "Respondent"
label define label_stat_hr 2 "Partial respondent, imputed", add
label define label_stat_hr 4 "Nonrespondent, imputed", add
label define label_stat_hr 5 "Nonrespondent, not imputed", add
label define label_stat_hr -2 "Not applicable", add
label define label_stat_hr -9 "Not active", add
label values stat_hr label_stat_hr
label define label_imp_hr 1 "Carry foreward (CF)"
label define label_imp_hr 2 "Nearest neighbor (NN)", add
label define label_imp_hr -2 "Not applicable", add
label values imp_hr label_imp_hr
label define label_lock_hr 0 "No data submitted"
label define label_lock_hr 8 "Complete, final lock applied", add
label define label_lock_hr -2 "Not applicable", add
label values lock_hr label_lock_hr
label define label_prch_hr 1 "Parent record includes data from child campuses"
label define label_prch_hr 2 "Child record - all data reported with parent campus", add
label define label_prch_hr -2 "Not applicable", add
label values prch_hr label_prch_hr
label define label_tenursys 1 "Has tenure system"
label define label_tenursys 2 "No tenure system", add
label define label_tenursys -1 "Not reported", add
label define label_tenursys -2 "Not applicable", add
label values tenursys label_tenursys
label define label_stat_al 1 "Respondent"
label define label_stat_al 2 "Partial respondent, imputed", add
label define label_stat_al 4 "Nonrespondent, imputed", add
label define label_stat_al 5 "Nonrespondent, not imputed", add
label define label_stat_al -2 "Not applicable", add
label define label_stat_al -9 "Not active", add
label values stat_al label_stat_al
label define label_lock_al 0 "No data submitted"
label define label_lock_al 8 "Complete, final lock applied", add
label define label_lock_al -2 "Not applicable", add
label values lock_al label_lock_al
label define label_prch_al 1 "Parent record includes data from child campuses"
label define label_prch_al 2 "Child record - all data reported with parent campus", add
label define label_prch_al -2 "Not applicable", add
label values prch_al label_prch_al
label define label_imp_al 1 "Carry forward (CF)"
label define label_imp_al 2 "Nearest neighbor (NN)", add
label define label_imp_al -2 "Not applicable", add
label values imp_al label_imp_al
label define label_hasal 1 "Yes, have access to library collections and have library expenses"
label define label_hasal 2 "Yes, have access to library collections, but no library expenses", add
label define label_hasal 0 "No access to library collections and no library expenses", add
label define label_hasal -2 "Not applicable", add
label define label_hasal -1 "Not reported", add
label values hasal label_hasal
*The following are the possible values for the item imputation field variables
*A Not applicable
*B Institution left item blank
*C Analyst corrected reported value
*D Do not know
*G Data generated from other data values
*H Value not derived - data not usable
*J Logical imputation
*K Ratio adjustment
*L Imputed using the Group Median procedure
*N Imputed using Nearest Neighbor procedure
*P Imputed using Carry Forward procedure
*R Reported
*Y Specific professional practice program n
*Z Implied zero
tab stat_ic
tab lock_ic
tab stat_adm
tab lock_adm
tab imp_adm
tab imp_ic
tab ntrldstr
tab prch_adm
tab stat_ef
tab lock_ef
tab prch_ef
tab imp_ef
tab pta99_ef
tab ptb_ef
tab ptc_ef
tab ptd_ef
tab ptacipef
tab stat_e12
tab lock_e12
tab prch_e12
tab imp_e12
tab stat_c
tab lock_c
tab prch_c
tab imp_c
tab sa_excl
tab stat_sa
tab stat_s
tab ftemp15
tab form_f
tab stat_f
tab lock_f
tab prchtp_f
tab prch_f
tab imp_f
tab fybeg
tab fyend
tab gpfs
tab f1gasbal
tab f2pell
tab f3pell
tab f_athrv1
tab f_athrv2
tab f_athrv9
tab fcolathl
tab f_athex1
tab f_athex2
tab f_athex9
tab f_athrv
tab f3bist
tab stat_sfa
tab lock_sfa
tab prch_sfa
tab imp_sfa
tab sfaform
tab stat_gr
tab lock_gr
tab prch_gr
tab imp_gr
tab cohrtstu
tab stat_gr2
tab lock_gr2
tab prch_gr2
tab imp_gr2
tab stat_om
tab lock_om
tab prch_om
tab imp_om
tab stat_eap
tab stat_hr
tab imp_hr
tab lock_hr
tab prch_hr
tab tenursys
tab stat_al
tab lock_al
tab prch_al
tab imp_al
tab hasal
summarize idx_adm
summarize pcadm_f
summarize idx_ef
summarize pcef_f
summarize idx_e12
summarize pce12_f
summarize idx_c
summarize pcc_f
summarize idx_f
summarize pcf_f
summarize idx_sfa
summarize pcsfa_f
summarize idx_gr
summarize pcgr_f
summarize idx_gr2
summarize pcgr2_f
summarize idx_om
summarize pcom_f
summarize idx_hr
summarize pchr_f
summarize idx_al
summarize pcal_f
