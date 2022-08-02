import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  async login({ commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoginState', true)
        commit('setUserUid', userCredential.user.uid)
        commit('setEmail', userCredential.user.email)
        console.log('ログインOK!')
        this.$router.push('/book')
      })
      .catch((e) => {
        alert(e.message)
        console.error('error ', e)
      })
  },
  async logout({ commit }) {
    const auth = getAuth(this.$firebase)
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        commit('setUserUid', '')
        commit('setEmail', '')
        this.$router.push('/auth/login')
      })
      .catch((e) => {
        alert(e.message)
        console.error('error ', e)
      })
  },
}

export const getters = {
  getLoggedIn(state) {
    return !!state.isLoggedIn
  },
  getUserUid(state) {
    return state.userUid
  },
  getUserEmail(state) {
    return state.email
  },
}
