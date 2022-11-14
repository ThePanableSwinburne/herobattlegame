using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class HerosController : ControllerBase
{
    private readonly DataContext context;
    public HerosController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Hero>>> GetHeros()
    {
        var heros = context.Heros.ToListAsync();
        return await heros;
    }

}