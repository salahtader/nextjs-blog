import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../db/configFirebase'; // Importation de la configuration Firebase
import { useRouter } from 'next/navigation'; // Importation du hook useRouter pour la navigation

// Initialisation du fournisseur d'authentification Google
const providerGoogle = new GoogleAuthProvider();

const useClientAuth = () => {
  const [user, setUser] = useState<User | null>(null); // État pour stocker l'utilisateur
  const [isFetch, setIsFetch] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const router = useRouter(); // Hook pour la navigation

  // Fonction pour inscrire un nouvel utilisateur avec email et mot de passe
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Inscription de l'utilisateur
      setUser(userCredential.user); // Mise à jour de l'état utilisateur
      router.push("/Dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      console.log("erreur signUp"); // Gestion des erreurs
    }
  };
  
  // Fonction pour connecter un utilisateur avec email et mot de passe
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Connexion de l'utilisateur
      setUser(userCredential.user); // Mise à jour de l'état utilisateur
      router.push("/dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      console.log("erreur signIn"); // Gestion des erreurs
    }
  };

  // Fonction pour se connecter avec Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, providerGoogle); // Connexion avec Google
    const user = result.user; // Récupération de l'utilisateur
    if(user){
      router.push("/dashboard"); // Redirection vers le tableau de bord si l'utilisateur est authentifié
    }
  };

  // Hook useEffect pour écouter les changements d'état de l'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user); // Mise à jour de l'état utilisateur
        setIsFetch(false); // Indication que les données ont été chargées
      } else {
        setUser(null); // Mise à jour de l'état utilisateur
        setIsFetch(false); // Indication que les données ont été chargées
      }
    });
    return () => unsubscribe(); // Nettoyage lors du démontage du composant
  }, []);

  // Fonction pour rediriger l'utilisateur s'il est déjà authentifié
  const redirectIfAuthenticated = () => {
    if (user) {
      router.push('/dashboard'); // Redirection vers le tableau de bord
    }
  };

  // Retourne les valeurs et fonctions nécessaires pour l'authentification
  return { user, isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle };
};

export default useClientAuth;
