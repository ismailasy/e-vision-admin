import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";

// import { useQuery } from "@tanstack/react-query";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
//   {
//     field: "firstName",
//     type: "string",
//     headerName: "First name",
//     width: 150,
//   },
//   {
//     field: "lastName",
//     type: "string",
//     headerName: "Last name",
//     width: 150,
//   },
//   {
//     field: "email",
//     type: "string",
//     headerName: "Email",
//     width: 200,
//   },
//   {
//     field: "phone",
//     type: "string",
//     headerName: "Phone",
//     width: 200,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 200,
//     type: "string",
//   },
//   {
//     field: "verified",
//     headerName: "Verified",
//     width: 150,
//     type: "boolean",
//   },
// ];
const columns: GridColDef[] = [
  {
    field: "prenom",
    type: "string",
    headerName: "Prenom",
    width: 150,
  },
  {
    field: "nom",
    type: "string",
    headerName: "Nom",
    width: 150,
  },
  {
    field: "username", // Ajout du champ username
    type: "string",
    headerName: "Username",
    width: 150,
  },
  {
    field: "telephone", // Ajout du champ telephone
    type: "string",
    headerName: "Téléphone",
    width: 200,
  },
  {
    field: "adresse", // Ajout du champ adresse
    type: "string",
    headerName: "Addresse",
    width: 200,
  },
  // ... Autres colonnes
];


const Users = () => {
  // const [open, setOpen] = useState(false);


  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    username: "",
    telephone: "",
    adresse: "",
    password: "",
  });
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // const handleSubmit = () => {
  //   // Ajoutez votre logique d'enregistrement ici
  //   // Utilisez les valeurs de formData pour envoyer les données à votre API Flask, par exemple
  //   console.log("Enregistrement des données :", formData);
  //   // Réinitialisez le formulaire et fermez la modal
  //   setFormData({
  //     prenom: "",
  //     nom: "",
  //     username: "",
  //     telephone: "",
  //     adresse: "",
  //     password: "",
  //   });
  //   setOpen(false);
  // };
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/Authentification/api/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: formData.telephone,
          adresse: formData.adresse,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      navigate('/home/users');
      console.log('Utilisateur enregistré avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    } finally {
      // Réinitialisez le formulaire et fermez la modal
      setFormData({
        prenom: "",
        nom: "",
        username: "",
        telephone: "",
        adresse: "",
        password: "",
      });
      setOpen(false);
      
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/Authentification/utilisateurs", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        const listUsers = JSON.stringify(data);
        setUserData(JSON.parse(listUsers).user_data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return (
    // <div className="users">
    //   <div className="info">
    //     <h1>Users</h1>
    //     <button onClick={() => setOpen(true)}>Add New User</button>
    //   </div>
    //   <DataTable slug="users" columns={columns} rows={userRows} />
    //   {/* TEST THE API */}

    //   {/* {isLoading ? (
    //     "Loading..."
    //   ) : (
    //     <DataTable slug="users" columns={columns} rows={data} />
    //   )} */}
    //   {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    // </div>
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
        <button onClick={() => setOpen(true)}>Ajouter un nouvel utilisateur</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={userData} />
      )}
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enregistrer un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            label="Prénom"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nom"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Adresse"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enregistrer un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Première colonne */}
              <TextField
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nom d'utilisateur"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              {/* Deuxième colonne */}
              <TextField
                label="Téléphone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>


      {/* {open && <Add slug="Utilisateur" columns={columns} setOpen={setOpen} />} */}

    </div>
  );
};

export default Users;
