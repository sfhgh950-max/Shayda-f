document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // Elements
    // ================================

    const jobText = document.getElementById("jobText");
    const analyzeBtn = document.getElementById("analyzeBtn");

    const clearBtn = document.querySelector(
        ".action-row .btn-secondary"
    );

    const resultsSection = document.querySelector(".results");

    // ================================
    // Initial State
    // ================================

    if (resultsSection) {
        resultsSection.style.display = "none";
    }


    // ================================
    // Analyze Job
    // ================================

    if (analyzeBtn) {

        analyzeBtn.addEventListener("click", async () => {

            const text = jobText.value.trim();

            // Validate Input
            if (!text) {

                alert(
                    "لطفاً ابتدا عنوان یا شرح شغل را وارد کنید."
                );

                jobText.focus();

                return;

            }


            // Loading State

            const originalText =
                analyzeBtn.innerHTML;

            analyzeBtn.disabled = true;

            analyzeBtn.innerHTML =
                "در حال تحلیل...";


            // Simulated AI Processing

            await new Promise(resolve => {

                setTimeout(resolve, 1500);

            });


            // Show Results

            if (resultsSection) {

                resultsSection.style.display =
                    "block";

                resultsSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }


            // Restore Button

            analyzeBtn.disabled = false;

            analyzeBtn.innerHTML =
                originalText;

        });

    }


    // ================================
    // Clear Input
    // ================================

    if (clearBtn) {

        clearBtn.addEventListener(
            "click",
            () => {

                jobText.value = "";

                jobText.focus();

                if (resultsSection) {

                    resultsSection.style.display =
                        "none";

                }

            }
        );

    }


    // ================================
    // Keyboard Shortcut
    // Ctrl + Enter
    // ================================

    if (jobText) {

        jobText.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    analyzeBtn.click();

                }

            }
        );

    }

});
