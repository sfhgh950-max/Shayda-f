/* ==========================================
   SHAYDA
   Version 1.1
   Smart Human Resource Platform
   (Connected to Backend AI Analysis API)

   Designed & Engineered by Mr Sj
========================================== */



/* ==========================================
        DOM ELEMENTS
========================================== */


const postTitleInput =
    document.getElementById("postTitle");


const postCodeInput =
    document.getElementById("postCode");


const postLevelInput =
    document.getElementById("postLevel");


const organizationalUnitInput =
    document.getElementById("organizationalUnit");


const jobTextInput =
    document.getElementById("jobText");


const analyzeBtn =
    document.getElementById("analyzeBtn");


const clearBtn =
    document.getElementById("clearBtn");


const resultsSection =
    document.getElementById("resultsSection");


const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");



/* ==========================================
        RESULT ELEMENTS
========================================== */


const resultPostTitle =
    document.getElementById("resultPostTitle");


const resultPostCode =
    document.getElementById("resultPostCode");


const resultPostLevel =
    document.getElementById("resultPostLevel");


const resultOrganizationalUnit =
    document.getElementById(
        "resultOrganizationalUnit"
    );


const shaydaScore =
    document.getElementById("shaydaScore");


const matchScore =
    document.getElementById("matchScore");


const riskScore =
    document.getElementById("riskScore");


const jobSummary =
    document.getElementById("jobSummary");


const riskExplanation =
    document.getElementById(
        "riskExplanation"
    );


const competenciesTable =
    document.getElementById(
        "competenciesTable"
    );


const technicalSkills =
    document.getElementById(
        "technicalSkills"
    );


const behavioralSkills =
    document.getElementById(
        "behavioralSkills"
    );


const softwareSkills =
    document.getElementById(
        "softwareSkills"
    );


const strengths =
    document.getElementById(
        "strengths"
    );


const developmentRoadmap =
    document.getElementById(
        "developmentRoadmap"
    );


const trainingCourses =
    document.getElementById(
        "trainingCourses"
    );


const improvementAreas =
    document.getElementById(
        "improvementAreas"
    );


const managementRecommendation =
    document.getElementById(
        "managementRecommendation"
    );


const analysisExplanation =
    document.getElementById(
        "analysisExplanation"
    );



/* ==========================================
        API CONFIG
        (از js/config.js خوانده می‌شود)
========================================== */


const API_BASE_URL =
    (window.SHAYDA_CONFIG &&
        window.SHAYDA_CONFIG.API_BASE_URL) ||
    "";


const ANALYZE_ENDPOINT =
    `${API_BASE_URL}/api/analyze`;



/* ==========================================
        INITIAL STATE
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        if (resultsSection) {


            resultsSection.style.display =
                "none";


        }


    }
);



/* ==========================================
        ANALYZE BUTTON
========================================== */


if (analyzeBtn) {


    analyzeBtn.addEventListener(
        "click",
        analyzeJob
    );


}



/* ==========================================
        CLEAR BUTTON
========================================== */


if (clearBtn) {


    clearBtn.addEventListener(
        "click",
        clearForm
    );


}



/* ==========================================
        MAIN ANALYSIS FUNCTION
========================================== */


async function analyzeJob() {


    const postTitle =
        postTitleInput.value.trim();


    const postCode =
        postCodeInput.value.trim();


    const postLevel =
        postLevelInput.value;


    const organizationalUnit =
        organizationalUnitInput.value;


    const jobText =
        jobTextInput.value.trim();



    /* ======================================
            VALIDATION
    ====================================== */


    if (!postTitle) {


        showMessage(
            "لطفاً عنوان پست را وارد نمایید."
        );


        postTitleInput.focus();


        return;


    }



    if (!postLevel) {


        showMessage(
            "لطفاً سطح پست را انتخاب نمایید."
        );


        postLevelInput.focus();


        return;


    }



    if (!organizationalUnit) {


        showMessage(
            "لطفاً واحد سازمانی را انتخاب نمایید."
        );


        organizationalUnitInput.focus();


        return;


    }



    if (!jobText || jobText.length < 40) {


        showMessage(
            "لطفاً شرح شغل را با جزئیات کافی وارد نمایید (حداقل ۴۰ کاراکتر)."
        );


        jobTextInput.focus();


        return;


    }



    /* ======================================
            SHOW LOADING STATE
    ====================================== */


    setLoadingState(true);



    /* ======================================
            CALL BACKEND API
    ====================================== */


    try {


        const analysis =
            await fetchAnalysisFromApi({

                jobTitle: postTitle,

                jobCode: postCode,

                jobLevel: postLevel,

                organizationalUnit,

                jobDescription: jobText

            });


        renderResults(analysis);


    } catch (error) {


        console.error(
            "[SHAYDA] خطا در دریافت تحلیل:",
            error
        );


        showMessage(
            error.message ||
            "خطا در ارتباط با سرور تحلیل هوشمند. لطفاً دوباره تلاش کنید."
        );


    } finally {


        setLoadingState(false);


    }


}



/* ==========================================
        FETCH ANALYSIS FROM BACKEND API
========================================== */


async function fetchAnalysisFromApi(payload) {


    let response;


    try {


        response = await fetch(
            ANALYZE_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );


    } catch (networkError) {


        throw new Error(
            "امکان اتصال به سرور تحلیل وجود ندارد. اتصال اینترنت یا آدرس API را بررسی نمایید."
        );


    }


    let data;


    try {


        data = await response.json();


    } catch (parseError) {


        throw new Error(
            "پاسخ سرور قابل پردازش نبود."
        );


    }


    if (!response.ok || !data.success) {


        throw new Error(
            (data && data.error) ||
            "سرور تحلیل هوشمند قادر به پردازش درخواست نبود."
        );


    }


    return data.analysis;


}



/* ==========================================
        RENDER RESULTS
========================================== */


function renderResults(data) {



    /* ======================================
            BASIC INFORMATION
    ====================================== */


    resultPostTitle.textContent =
        data.postTitle;


    resultPostCode.textContent =
        data.postCode;


    resultPostLevel.textContent =
        data.postLevel;


    resultOrganizationalUnit.textContent =
        data.organizationalUnit;



    /* ======================================
            SCORES
    ====================================== */


    shaydaScore.textContent =
        `${data.shaydaScore} / 100`;


    matchScore.textContent =
        `${data.matchScore}%`;


    riskScore.textContent =
        `${data.riskScore}% — ${data.riskLevel}`;



    /* ======================================
            TEXT RESULTS
    ====================================== */


    jobSummary.textContent =
        data.jobSummary;


    riskExplanation.textContent =
        data.riskExplanation;


    managementRecommendation.textContent =
        data.managementRecommendation;


    analysisExplanation.textContent =
        data.analysisExplanation;



    /* ======================================
            COMPETENCIES
    ====================================== */


    renderCompetencies(
        data.competencies
    );



    /* ======================================
            SKILLS
    ====================================== */


    renderList(
        technicalSkills,
        data.technicalSkills
    );


    renderList(
        behavioralSkills,
        data.behavioralSkills
    );


    renderList(
        softwareSkills,
        data.softwareSkills
    );


    renderList(
        strengths,
        data.strengths
    );



    /* ======================================
            DEVELOPMENT
    ====================================== */


    developmentRoadmap.textContent =
        data.developmentRoadmap;



    /* ======================================
            TRAINING
    ====================================== */


    renderList(
        trainingCourses,
        data.trainingCourses
    );



    /* ======================================
            IMPROVEMENT
    ====================================== */


    renderList(
        improvementAreas,
        data.improvementAreas
    );



    /* ======================================
            SHOW RESULTS
    ====================================== */


    resultsSection.style.display =
        "block";


    resultsSection.classList.remove(
        "zoom"
    );


    void resultsSection.offsetWidth;


    resultsSection.classList.add(
        "zoom"
    );


    setTimeout(() => {


        resultsSection.scrollIntoView({


            behavior:"smooth",


            block:"start"


        });


    },100);


}



/* ==========================================
        RENDER COMPETENCIES
========================================== */


function renderCompetencies(
    competencies
) {



    competenciesTable.innerHTML =
        "";



    competencies.forEach(
        (item,index) => {



            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `


                <td>
                    ${index + 1}
                </td>


                <td>
                    <strong>
                        ${escapeHtml(item.name)}
                    </strong>
                </td>


                <td>
                    ${escapeHtml(item.definition)}
                </td>


                <td>
                    ${item.required} از 5
                </td>


                <td>
                    ${item.current} از 5
                </td>


                <td>
                    ${item.gap}
                </td>


            `;



            competenciesTable.appendChild(
                row
            );


        }
    );


}



/* ==========================================
        RENDER LIST
========================================== */


function renderList(
    container,
    items
) {



    container.innerHTML =
        "";



    (items || []).forEach(
        item => {



            const li =
                document.createElement(
                    "li"
                );



            li.textContent =
                item;



            container.appendChild(
                li
            );


        }
    );


}



/* ==========================================
        CLEAR FORM
========================================== */


function clearForm() {



    postTitleInput.value =
        "";


    postCodeInput.value =
        "";


    postLevelInput.value =
        "";


    organizationalUnitInput.value =
        "";


    jobTextInput.value =
        "";



    resultsSection.style.display =
        "none";



    window.scrollTo({


        top:0,


        behavior:"smooth"


    });


}



/* ==========================================
        LOADING STATE
========================================== */


function setLoadingState(
    isLoading
) {



    if (!analyzeBtn) {


        return;


    }



    if (isLoading) {



        analyzeBtn.disabled =
            true;



        analyzeBtn.dataset.originalText =
            analyzeBtn.textContent;



        analyzeBtn.textContent =
            "در حال تحلیل...";



        analyzeBtn.style.opacity =
            "0.7";



        analyzeBtn.style.cursor =
            "wait";



    } else {



        analyzeBtn.disabled =
            false;



        analyzeBtn.textContent =
            analyzeBtn.dataset.originalText
            ||
            "تحلیل هوشمند شغل";



        analyzeBtn.style.opacity =
            "1";



        analyzeBtn.style.cursor =
            "pointer";


    }


}



/* ==========================================
        MESSAGE
========================================== */


function showMessage(
    message
) {


    alert(message);


}



/* ==========================================
        HTML ESCAPE
========================================== */


function escapeHtml(
    value
) {


    const div =
        document.createElement(
            "div"
        );



    div.textContent =
        value;



    return div.innerHTML;


}



/* ==========================================
        PDF BUTTON
========================================== */


if (downloadPdfBtn) {


    downloadPdfBtn.addEventListener(


        "click",


        () => {


            showMessage(


                "ماژول تولید گزارش PDF در مرحله بعدی فعال خواهد شد."


            );


        }


    );


}



/* ==========================================
        END
========================================== */

