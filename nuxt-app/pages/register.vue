<script setup lang="ts">
const user = useSupabaseUser()
const firstname = ref('')
const lastname = ref('')
const alias = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const accept = ref(false)
const registrationSuccess = ref(false)

const { auth } = useSupabaseClient()

const formatName = (name: string) => {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const submitRegisterForm = async () => {
  console.log('Submit button clicked')
  if (!accept.value) {
    alert('Vous devez accepter les termes et conditions.')
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match!'
    password.value = ''
    confirmPassword.value = ''
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
    return
  }

  try {
    console.log('Attempting sign up')
    const { error } = await auth.signUp({
      email: email.value.toLowerCase(),
      password: password.value,
      options: {
        data: {
          firstname: formatName(firstname.value),
          lastname: lastname.value.toUpperCase(),
          alias: alias.value,
        },
      },
    })

    if (error) throw error

    // Clear form
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    firstname.value = ''
    lastname.value = ''
    alias.value = ''

    registrationSuccess.value = true
    console.log('User signed up successfully')
  }
  catch (error) {
    console.error('Sign up error:', error)
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
  }
}

watchEffect(() => {
  if (user.value) {
    console.log('User logged in, redirecting to home')
  }
})
</script>

<template>
  <main class="main flex flex-col items-center">
    <div class="card flex justify-center" />
    <!-- <h1 class="text-3xl font-bold sm:text-4xl">
      Page registration
    </h1> -->
    <div
      id="register"
      class="card w-full sm:w-80 p-6 mb-6"
    >
      <form
        class="w-full sm:w-80 flex flex-col gap-4"
        @submit.prevent="submitRegisterForm"
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="../public/img/disco-ball-tangerine.png"
            alt="Logo Festify"
          >
          <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            {{ $t("register.title") }}
          </h2>
        </div>
        <IconField>
          <InputIcon>
            <i class="pi pi-user" />
          </InputIcon>
          <InputText
            id="firstname"
            v-model="firstname"
            class="text"
            type="text"
            :placeholder="$t('user.firstname')"
            autofocus
            fluid
          />
        </IconField>

        <IconField>
          <InputIcon>
            <i class="pi pi-user" />
          </InputIcon>
          <InputText
            id="lastname"
            v-model="lastname"
            class="text"
            type="text"
            :placeholder="$t('user.lastname')"
            autofocus
            fluid
          />
        </IconField>

        <IconField>
          <InputIcon>
            <i class="pi pi-user" />
          </InputIcon>
          <InputText
            id="alias"
            v-model="alias"
            class="text"
            type="text"
            :placeholder="$t('user.alias')"
            autofocus
            fluid
          />
        </IconField>

        <IconField>
          <InputIcon>
            <i class="pi pi-envelope" />
          </InputIcon>
          <InputText
            id="email"
            v-model="email"
            class="text"
            type="email"
            :placeholder="$t('user.email')"
            fluid
          />
        </IconField>

        <IconField>
          <InputIcon>
            <i class="pi pi-key" />
          </InputIcon>
          <InputText
            id="password1"
            v-model="password"
            class="text"
            type="password"
            :placeholder="$t('user.password')"
            fluid
          />
        </IconField>

        <IconField>
          <InputIcon>
            <i class="pi pi-key" />
          </InputIcon>
          <InputText
            id="password2"
            v-model="confirmPassword"
            class="text"
            type="password"
            :placeholder="$t('user.password_confirmed')"
            fluid
          />
        </IconField>

        <div
          id="accept-conditions"
          class="flex items-center gap-2 text-sm"
        >
          <Checkbox
            id="accept"
            v-model="accept"
            name="accept-registration"
            value="Accept"
          />
          <label for="accept">{{ $t("register.agree") }}</label>
        </div>

        <Button
          id="sign-up-button"
          type="submit"
          :label="$t('register.button')"
          icon="pi pi-user-plus"
          class="mt-2"
        />
      </form>
    </div>
    <AlertRegistration v-if="registrationSuccess" />
    <div
      v-if="errorMsg"
      class="error-message"
    >
      {{ errorMsg }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
* {
  background-color: $seashell;
}
h2 {
  color: $indigo;
}
.text {
  color: $indigo;
}
#register {
  border-radius: 1rem;
  border-color: $tangerine;
  padding: 1.5rem;
  margin-top: 59px;
  border-width: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: white;
}
#register * {
  background-color: white;
}
#sign-up-button, #sign-up-button * {
  background-color: $indigo;
  color: $seashell;
  border-color: $indigo;
}
#sign-up-button:hover, #sign-up-button:hover * {
  background-color: $tangerine;
  color: $indigo;
  border-color: $indigo;
}
#accept-conditions {
  color: $indigo;
}
h1 {
  background-color: $tangerine;
  color: $indigo;
  width: 100%;
  height: 100px;
  align-content: center;
  text-align: center;
}
@media (min-width: 1024px) {
  #register {
    margin-top: 59px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 424px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    width: 100%;
  }
}
@media (max-width: 600px) {
  #register {
    width: 80%; /* Définit la largeur à 80% de l'écran sur les smartphones */
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
