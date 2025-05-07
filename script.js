// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle")
    const navMobile = document.getElementById("nav-mobile")
  
    if (menuToggle && navMobile) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        navMobile.classList.toggle("active")
        document.body.classList.toggle("menu-open")
      })
  
      // Close mobile menu when clicking on a link
      const mobileLinks = navMobile.querySelectorAll("a")
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          menuToggle.classList.remove("active")
          navMobile.classList.remove("active")
          document.body.classList.remove("menu-open")
        })
      })
    }
  
    // Header scroll effect
    const header = document.getElementById("header")
  
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  
    // Terminal typing effect
    const terminalCursor = document.querySelector(".terminal-cursor")
  
    if (terminalCursor) {
      // Already styled with CSS animation
    }
  
    // Contact form validation and submission
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      // Inicializar EmailJS
      ;(() => {
        // Substitua "YOUR_PUBLIC_KEY" pela sua chave pública do EmailJS
        emailjs.init("iFLAwnK19hUGEfEtr")
      })()
  
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Reset previous error messages
        const errorMessages = document.querySelectorAll(".error-message")
        errorMessages.forEach((error) => {
          error.textContent = ""
        })
  
        // Get form fields
        const nameInput = document.getElementById("name")
        const emailInput = document.getElementById("email")
        const subjectInput = document.getElementById("subject")
        const messageInput = document.getElementById("message")
        const formSuccess = document.getElementById("form-success")
        const submitButton = contactForm.querySelector("button[type='submit']")
  
        // Validate form
        let isValid = true
  
        // Name validation
        if (!nameInput.value.trim()) {
          document.getElementById("name-error").textContent = "Por favor, informe seu nome"
          isValid = false
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          document.getElementById("email-error").textContent = "Por favor, informe um email válido"
          isValid = false
        }
  
        // Subject validation
        if (!subjectInput.value.trim()) {
          document.getElementById("subject-error").textContent = "Por favor, informe o assunto"
          isValid = false
        }
  
        // Message validation
        if (!messageInput.value.trim()) {
          document.getElementById("message-error").textContent = "Por favor, escreva sua mensagem"
          isValid = false
        }
  
        // If form is valid, submit it
        if (isValid) {
          // Disable submit button and show loading state
          submitButton.disabled = true
          submitButton.textContent = "Enviando..."
  
          // Prepare template parameters
          const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
          }
  
          // Send email using EmailJS
          // Substitua "YOUR_SERVICE_ID" e "YOUR_TEMPLATE_ID" pelos seus IDs do EmailJS
          emailjs
            .send("service_o9her8m", "template_yqdpos4", templateParams)
            .then((response) => {
              console.log("Email enviado com sucesso!", response.status, response.text)
  
              // Show success message
              formSuccess.style.display = "block"
              formSuccess.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve."
  
              // Reset form
              contactForm.reset()
  
              // Reset button
              submitButton.disabled = false
              submitButton.textContent = "Enviar Mensagem"
  
              // Hide success message after 5 seconds
              setTimeout(() => {
                formSuccess.style.display = "none"
              }, 5000)
            })
            .catch((error) => {
              console.error("Erro ao enviar email:", error)
  
              // Show error message
              formSuccess.style.display = "block"
              formSuccess.textContent = "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente."
              formSuccess.style.backgroundColor = "rgba(207, 102, 121, 0.1)"
              formSuccess.style.borderColor = "rgba(207, 102, 121, 0.3)"
  
              // Reset button
              submitButton.disabled = false
              submitButton.textContent = "Enviar Mensagem"
  
              // Hide error message after 5 seconds
              setTimeout(() => {
                formSuccess.style.display = "none"
                formSuccess.style.backgroundColor = ""
                formSuccess.style.borderColor = ""
              }, 5000)
            })
        }
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
  
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Newsletter form submission (for demonstration)
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const emailInput = newsletterForm.querySelector('input[type="email"]')
  
        if (emailInput && emailInput.value.trim()) {
          // In a real application, you would send this to a server
          console.log("Newsletter subscription:", emailInput.value.trim())
  
          // Reset form
          newsletterForm.reset()
  
          // Show a simple alert (in a real app, you'd use a better UI feedback)
          alert("Obrigado por se inscrever em nossa newsletter!")
        }
      })
    }
  })
  