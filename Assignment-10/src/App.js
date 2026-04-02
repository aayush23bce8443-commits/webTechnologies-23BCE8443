// import FormValidation from "./Exercise1/FormValidation";

// import FetchData from "./Exercise3/FetchData";

// function App() {
//   return (
//     <div>
//       <h1>Lab 10</h1>
//       <FormValidation />
//     </div>
//   );


// }


// <FetchData />


// // import ItemList from "./Exercise2/ItemList";

// // function App() {
// //   return (
// //     <div>
// //       <h1>Lab 10</h1>

// //       {/* Exercise 1 */}
// //       <FormValidation />

// //       <hr />

// //       {/* Exercise 2 */}
// //       <ItemList />
// //     </div>
// //   );
// // }



import React from "react";

import FormValidation from "./exercise1/FormValidation";
import ItemList from "./exercise2/ItemList";
import FetchData from "./exercise3/FetchData";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Lab 10</h1>

      {/* Exercise 1 */}
      <h2>Exercise 1</h2>
      <FormValidation />

      <hr />

      {/* Exercise 2 */}
      <h2>Exercise 2</h2>
      <ItemList />

      <hr />

      {/* Exercise 3 */}
      <h2>Exercise 3</h2>
      <FetchData />
    </div>
  );
}

export default App;
