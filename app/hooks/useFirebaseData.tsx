import { useState, useEffect } from "react";
import { db } from "db/configFirebase";
import { collection, getDocs } from "firebase/firestore";

export interface PostData {
  id: string; 
  title: string;
  image: string;
  author: string;
  desc: string;
}

const useFirebaseData = (): PostData[] => {
  const [data, setData] = useState<PostData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {

        const querySnapshot = await getDocs(collection(db, "posts")); //recupérer tous les documents de la collection posts.
        
        const newData: PostData[] = [];
        querySnapshot.forEach((doc:any) => {
          newData.push({ id: doc.id, ...doc.data() } as PostData); 
        });
        // console.log(newData);
        
        setData((prevData) => {
          const newDataWithoutDuplicates = newData.filter((newItem) => //rée un nouveau tableau contenant uniquement les éléments de newData non double 
            !prevData.some((prevItem) => prevItem.id === newItem.id)        // vérifie si prevData contient un élément avec le même id que newItem.
          );
          return [...prevData, ...newDataWithoutDuplicates];
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getData();

    return () => setData([]);
  }, []);

  return data;
};

export default useFirebaseData;

/*
Contexte
Ce bloc de code se trouve dans la fonction getData, qui est définie dans le hook useFirebaseData. Après avoir récupéré les documents de la collection posts de Firestore, on veut mettre à jour l'état data avec ces nouveaux documents, en évitant les doublons.

Explication du Code
javascript
Copier le code
setData((prevData) => {
  const newDataWithoutDuplicates = newData.filter((newItem) =>
    !prevData.some((prevItem) => prevItem.id === newItem.id)
  );
  return [...prevData, ...newDataWithoutDuplicates];
});
setData((prevData) => { ... }):

setData est utilisé pour mettre à jour l'état data.
prevData représente l'état actuel des données avant la mise à jour.
newData.filter((newItem) => { ... }):

newData contient les nouveaux documents récupérés de Firestore.
filter crée un nouveau tableau contenant uniquement les éléments de newData qui satisfont la condition spécifiée dans la fonction de rappel.
!prevData.some((prevItem) => prevItem.id === newItem.id):

prevData.some((prevItem) => prevItem.id === newItem.id) vérifie si prevData contient un élément avec le même id que newItem.
some retourne true si au moins un élément dans prevData satisfait la condition.
!prevData.some((prevItem) => prevItem.id === newItem.id) retourne true si aucun élément dans prevData n'a le même id que newItem, c'est-à-dire que newItem est unique.
newDataWithoutDuplicates:

Le tableau newDataWithoutDuplicates contient uniquement les éléments de newData qui n'ont pas de doublons dans prevData.
return [...prevData, ...newDataWithoutDuplicates]:

...prevData et ...newDataWithoutDuplicates sont des opérateurs de décomposition qui permettent de créer un nouveau tableau contenant tous les éléments de prevData suivis des éléments de newDataWithoutDuplicates.
Cette opération fusionne les anciens et les nouveaux éléments, en s'assurant qu'il n'y a pas de doublons.
Résumé
L'objectif de ce bloc de code est de mettre à jour l'état data avec les nouveaux documents récupérés de Firestore tout en évitant d'ajouter des doublons. Voici le processus en résumé :

Filtrer les nouveaux documents pour retirer ceux qui sont déjà présents dans les données actuelles (prevData).
Ajouter les nouveaux documents uniques aux données actuelles.
Exemple
Imaginons que prevData contient :

javascript
Copier le code
[
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' }
]
Et que newData contient :

javascript
Copier le code
[
  { id: '2', title: 'Post 2' },
  { id: '3', title: 'Post 3' }
]
Le filtre retirera le doublon (id: '2') de newData, et newDataWithoutDuplicates sera :

javascript
Copier le code
[
  { id: '3', title: 'Post 3' }
]
Finalement, data sera mis à jour avec :

javascript
Copier le code
[
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' },
  { id: '3', title: 'Post 3' }
]
*/