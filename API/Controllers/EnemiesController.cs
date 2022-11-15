using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class EnemiesController : ControllerBase
{
    private readonly DataContext context;
    public EnemiesController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Enemy>>> GetHeros()
    {
        var enemies = context.Enemies.ToListAsync();
        return await enemies;
    }

}