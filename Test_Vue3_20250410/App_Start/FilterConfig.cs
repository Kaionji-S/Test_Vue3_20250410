using System.Web;
using System.Web.Mvc;

namespace Test_Vue3_20250410
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
