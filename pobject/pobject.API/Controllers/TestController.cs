using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace pobject.API.Controllers;

[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    private IOptions<string> _options;
    public TestController(IOptions<string> options)
    {
        _options = options;
    }

    [HttpPost]
    [Route("1")]
    public IActionResult Test1(MyModel request)
    {
        if (ModelState.IsValid)
        {

        }
        return Ok();
    }
}

public class MyModel
{
    [Key]
    [Required(ErrorMessage ="Id Pk must be greater then 0")]  
    public int Numbers { get; set; }

    [Required]
    [StringLength(2, ErrorMessage = "Length is exceeded")]
    public string FirstName { get; set; }


    [StringLength(3, ErrorMessage = "Length is exceeded")]
    public string LastName { get; set; }


    [Range(16, 25, ErrorMessage = "User Age should be between 16,30")]
    public int Age { get; set; }


    [DisplayName("User's Display Name")]
    public string DisplayName { get; set; }

    [DisplayFormat(DataFormatString = "{MMMM dd, yyyy}")]
    public DateTime StartDate { get; set; }

    [MaxLength(10,ErrorMessage ="Max limit exceeded")]
    public string Description { get; set; }
    public int IsActive { get; set; }
    public object Data { get; set; } 
}
