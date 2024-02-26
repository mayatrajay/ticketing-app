import TicketCard from "./(components)/TicketCard"

const getTickets = async () => {
   try {
      const res = await fetch('http://localhost:3000/api/Tickets', {
         cache: 'no-store'
      })

      return res.json();
   } catch (error) {
      console.log('Failed to get tickets.', error);
   }
}

const Dashboard = async () => {

   const { tickets } = await getTickets();

   // get all categories
   const uniqueCategories = [
      ... new Set(tickets?.map(({ category }) => category)),
   ];

   // render each unique category with filtered tickets
   return (
      <div className="p-5">
         <div>
            {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
               <div className="mb-4" key={categoryIndex}>
                  <h2>{uniqueCategory}</h2>
                  <div className="md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {tickets.filter((ticket) => ticket.category === uniqueCategory).map((ticket, _index) => (
                        <TicketCard key={_index} id={_index} ticket={ticket} />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Dashboard
