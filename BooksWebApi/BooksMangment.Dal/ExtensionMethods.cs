using Microsoft.EntityFrameworkCore;

namespace BooksManagment.DAL
{
    public static class ExtensionMethods
    {
        public static DbContext SetConnectionString(this DbContext context, string connectionString)
        {
            context.SetConnectionString(connectionString);
            return context;
        }
    }
}
